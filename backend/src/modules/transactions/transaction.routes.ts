import { Router } from 'express';
import * as transactionController from './transaction.controller';

const router = Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.patch('/:transactionId/status', transactionController.updateTransactionStatus);
router.get('/:transactionId/investigate', transactionController.generateInvestigationReport);

export default router;
