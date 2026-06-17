import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/env.js';
import User from '../modal/user.model.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = await User.findById(decoded.userId)
            .select('-password');

        if (!req.user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
};