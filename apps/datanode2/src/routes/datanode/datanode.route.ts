import express from 'express';

import datanodeController from '../../controllers/datanode/datanode.controller';

const router = express.Router();

router.post('/heartbeat',datanodeController.sendHeartbeat);

export default router;
