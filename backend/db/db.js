const dotenv = require( 'dotenv' ); 
dotenv.config();
const mongoose = require( 'mongoose' );

async function connectToDb() {
    await mongoose.connect( process.env.DB_CONNECT )
        .then( () => console.log( 'Connected to DB' ) )
        .catch( err => console.log( err ) );
}

module.exports = connectToDb;