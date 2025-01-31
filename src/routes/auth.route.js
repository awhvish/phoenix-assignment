import express from 'express';
import {
  signinController,
  signupController,
  logoutController,
  checkController,
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new account and returns a JWT cookie.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Signup successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the user
 *                       example: "cm6kl4tcc0000ucjobm1n8xl3"
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       example: "johndoe@example.com"
 *       400:
 *         description: Validation failed or email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already exists"
 *       500:
 *         description: Internal server error, could not create the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating user"
 */

router.post('/signup', signupController);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login a user
 *     description: Logs in a user and returns a JWT cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Signin successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the user
 *                       example: "cm6kl4tcc0000ucjobm1n8xl3"
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       example: "johndoe@example.com"
 *       400:
 *         description: Invalid credentials or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No user with provided email"  # Or "Wrong password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/signin', signinController);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout a user
 *     description: Clears the JWT cookie to log out the user.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged out"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/signout', logoutController);

/**
 * @swagger
 * /auth/check:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Check the current authenticated user
 *     description: Returns the user information of the currently authenticated user based on the provided JWT token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: User's name
 *                 email:
 *                   type: string
 *                   description: User's email
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No user found"
 */

router.get('/check', protectRoute, checkController);

export default router;
