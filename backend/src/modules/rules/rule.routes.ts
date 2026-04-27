import { Router } from 'express';
import * as ruleController from './rule.controller';

const router = Router();

router.post('/', ruleController.createRule);
router.get('/', ruleController.getAllRules);
router.put('/:id', ruleController.updateRule);
router.delete('/:id', ruleController.deleteRule);

export default router;
