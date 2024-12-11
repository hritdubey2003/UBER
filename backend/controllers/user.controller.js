const userModel = require( '../models/user.model' );
const userService = require( '../services/user.service' );
const { validationResult } = require( 'express-validator' );
const blacklistTokenSchema = require( '../models/blacklistToken.model' );

module.exports.registerUser = async ( req , res , next ) => {
    const error = validationResult( req );

    if ( !error.isEmpty() ) {
        return res.status( 400 ).json( { errors: error.array() } );
    }

    const { fullname , email , password , username } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await userModel.hashPassword( password );

    const user = await userService.createUser( {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        username
    } );

    await user.save();

    console.log( user );

    const token = await user.generateAuthToken();

    res.status( 201 ).json( { token , user } );
};

module.exports.loginUser = async ( req , res , next ) => {
    const error = validationResult( req );

    if ( !error.isEmpty() ) {    
        return res.status( 400 ).json( { errors: error.array() } ); 
    }

    const { email , password } = req.body;

    const user = await userModel.findOne( { email }).select('+password');

    if ( !user ) {
        return res.status(401).json( { error: 'Invalid email or password' } );
    }
    
    const isMatch = await user.comparePassword( password );

    if ( !isMatch ) {
        return res.status(401).json( { error: 'Invalid email or password' } );
    }

    const token = await user.generateAuthToken();

    res.cookie( 'token' , token , { httpOnly: true } );

    res.status( 200 ).json( { token , user } );
}

module.exports.getUserProfile = async ( req , res , next ) => {
    res.status( 200 ).json( { user: req.user } );
}

module.exports.logoutUser = async ( req , res , next ) => {
    res.clearCookie( 'token' );
    const token = req.cookies.token || req.headers?.authorization.split(' ')[1];

    await blacklistTokenSchema.create( { token } );

    res.status( 200 ).json( { message: 'Logout successful' } );

}