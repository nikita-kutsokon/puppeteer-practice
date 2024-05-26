import { Router } from 'express';

import TusSiController from '../controllers/tus.controller';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';


const router = Router();

router.get(
    '/catalogs',
    ExceptionInterceptor(TusSiController.parseCatalogData),
);

export default router;