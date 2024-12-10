const dotenv = require( 'dotenv' );
dotenv.config();
const app = require( './app' );
const http = require( 'http' );
const PORT = process.env.PORT || 5000;
const cors = require( 'cors' );
app.use( cors() );

const server = http.createServer( app );

server.listen( PORT , () => {   
    console.log( `Server is running on port ${PORT}` );
} );