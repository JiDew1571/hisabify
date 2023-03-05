import express from 'express';
const router = express.Router();

import {
	createHisab,
	deleteHisab,
	getAllHisabs,
	updateHisab,
	showStats,
} from '../controllers/hisabsController.js';

import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createHisab).get(getAllHisabs);
// remember about :id
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteHisab).patch(testUser, updateHisab);

export default router;
