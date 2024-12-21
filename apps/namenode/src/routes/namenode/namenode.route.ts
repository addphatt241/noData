import express from 'express';

import handleFileController from '../../controllers/namenode/handleFile.controller';

const router = express.Router();

router.post('/uploadFile',handleFileController.checkUploadFile);

router.get('/readFile',handleFileController.checkReadFile);
export default router;
