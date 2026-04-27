import { Router } from 'express';
import * as adminController from './admin.controller';

const router = Router();

router.post('/login', adminController.adminLogin);
router.get('/stats', adminController.getAdminStats);
router.get('/users', adminController.listUsers);
router.delete('/transactions/purge', adminController.deleteAllTransactions);

export default router;
