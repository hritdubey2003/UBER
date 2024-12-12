const userModel = require( '../models/user.model' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const BlacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async ( req , res , next ) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = req.cookies.token || ( authHeader && authHeader.split(' ')[1]);
    
    if ( !token ) {
        return res.status( 401 ).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne( { token } );

    if ( isBlacklisted ) {
        return res.status( 401 ).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify( token , process.env.JWT_SECRET );
        const user = await userModel.findById( decoded._id)

        req.user = user ;
        next();
    } catch ( err ) {
        return res.status( 401 ).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async ( req , res , next ) => {
    const autoHeader = req.headers.authorization || req.headers.Authorization;
    const token = req.cookies.token || ( autoHeader && autoHeader.split(' ')[1]);

    if ( !token ) {
        return res.status( 401 ).json({ message: "Unauthorized!" });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({ token });

    if ( isBlacklisted ) {
        res.status( 401 ).json({ message: 'Unauthorized!' });
    }

    try {
        const decode = jwt.verify( token , process.env.JWT_SECRET );
        const captain = await captainModel.findById( decode._id );

        req.captain = captain;
        next();
    }catch( err ) {
        res.status(401).json({ message: 'Unauthorized!' });
    }
}