import { Router } from 'express';
import * as analyticsController from './analytics.controller';

const router = Router();

router.get('/summary', analyticsController.getDashboardSummary);
router.get('/trends', analyticsController.getRiskTrends);
router.get('/export', analyticsController.exportTransactions);

export default router;
