import { Router } from 'express';

import TusRouter from './routes/tus.router';
import ErrorHandler from './middlewares/error-handler.middleware';


const router = Router();

router.use('/parse/tus', TusRouter);

router.use(ErrorHandler);

export default router;