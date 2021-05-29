import express from 'express';
import main from './api/main';
import resize from './api/resize';
import path from 'path';
import logger from '../middleware/logger';

const routes = express.Router();

routes.use('/',logger,main);

routes.use('/resize',logger,resize);


export default routes;