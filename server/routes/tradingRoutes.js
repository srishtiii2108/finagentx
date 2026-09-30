import express from 'express';
import { getPortfolio, executeTrade } from '../controllers/tradingController.js';
import userAuth from '../middleware/userAuth.js';

const tradingRouter = express.Router();

tradingRouter.post('/get', userAuth, getPortfolio);
tradingRouter.post('/execute', userAuth, executeTrade);

export default tradingRouter;