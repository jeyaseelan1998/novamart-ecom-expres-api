import { Router } from 'express';

import { updateEmailState } from '../controller/emailLog.controller.js';

const webhookRouter = Router();

webhookRouter.post('/email/state', updateEmailState);

export default webhookRouter;