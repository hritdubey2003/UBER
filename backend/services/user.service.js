const userModel = require( '../models/user.model' );

module.exports.createUser = async ({
    firstname , lastname , email , password , username
}) => {
    if ( !firstname || !email || !password || !username ) {
        throw new Error( 'All fields are required' );
    }

    const user = userModel.create( {
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        username
    })

    return user;
}