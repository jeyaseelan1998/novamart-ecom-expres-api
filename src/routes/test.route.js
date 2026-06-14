import { Router } from 'express';

const testRouter = Router();

testRouter.get('/', (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            message: 'NovaMart API is running 🚀',
            timestamp: new Date().toISOString(),
        });
});

export default testRouter;