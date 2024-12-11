const express = require( 'express' );
const router = express.Router();

const { body } = require('express-validator');

const userController = require( '../controllers/user.controller' );
const authMiddleware = require( '../middlewares/auth.middleware' );

router.post( '/register' , [
    body( 'email' ).isEmail().withMessage( 'Invalid email' ),
    body( 'fullname.firstname' ).isLength( { min: 3 } ).withMessage( 'Firstname must be at least 3 characters long' ),
    body( 'password' ).isLength( { min: 5 } ).withMessage( 'Password must be at least 5 characters long' ),
    body( 'username' ).isLength( { min: 3 } ).withMessage( 'Username must be at least 3 characters long' )
 ] , userController.registerUser );

router.post( '/login' , [
    body('email').isEmail().withMessage( 'Invalid email' ),
    body('password').isLength( { min: 5 } ).withMessage( 'Password must be at least 5 characters long' )
], userController.loginUser );

router.get('/profile' , authMiddleware.authUser , userController.getUserProfile );

module.exports = router;