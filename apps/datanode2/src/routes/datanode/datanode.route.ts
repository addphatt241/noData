import express from 'express';
import multer from 'multer';
import datanodeController from '../../controllers/datanode/datanode.controller';
const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });
router.post('/heartbeat', datanodeController.sendHeartbeat);
router.post('/upload', upload.single('file'), datanodeController.uploadFile);
router.get('/read', datanodeController.readFile);
export default router;
