import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';

const userRouter = Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
userRouter.get('/profile', protect, (req, res) => {
    res.json(req.user);
});

export default userRouter;