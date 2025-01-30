import db from '../lib/db.js';
import bcrypt from 'bcryptjs';

import { signUpSchema } from '../schemas/user.schema.js';
import { signinSchema } from '../schemas/user.schema.js';
import { generateToken } from '../lib/generateToken.js';

export const checkController = async (req, res) => {
  try {
    const user = req?.user;
    res.status(200).json(user);
  } catch (error) {
    console.log('Error in checkAuth controller: ' + error);
    res.status(500).json({ message: 'No user found' });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.log('Error logging out: ' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    signinSchema.parse({ email, password });

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'No user with provided email' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    generateToken(user.id, res);

    return res
      .status(200)
      .json({ message: 'Signin successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    signUpSchema.parse({ name, email, password });

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({ data: { name, email, password: hashedPass } });

    if (!newUser) return res.status(500).json({ message: 'Error creating user' });

    generateToken(newUser.id, res);
    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(400).json({ message: 'Validation failed:', error: error });
  }
};
