const express = require( 'express' );
const app = express();

app.get( '/' , ( req , res ) => {
    res.send( 'Hey, Developer I am here' )
} );

module.exports = app