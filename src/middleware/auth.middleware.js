import jwt from 'jsonwebtoken';
import db from '../lib/db.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - no token provided' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'Internal server error - missing JWT secret' });
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token provided' });
    }

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true }, // excluded password for safety
    });

    if (!user) {
      return res.status(404).json({ message: 'User not signed in' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
