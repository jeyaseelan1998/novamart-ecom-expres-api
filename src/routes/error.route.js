import { Router } from 'express';
import { createExceptionLog } from '../controller/error.controller.js';

const errorRouter = Router();

errorRouter.post('/create', createExceptionLog);

export default errorRouter;