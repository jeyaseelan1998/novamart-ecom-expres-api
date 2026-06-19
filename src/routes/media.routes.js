import express from 'express';

import upload from '../middleware/media.middleware.js';
import {
    uploadMedia,
    deleteMedia,
    getAllMedia,
    getSingleMedia,
    updateMedia,
    getMediaFile
} from '../controller/media.controller.js';

const mediaRouter = express.Router();

mediaRouter.get('/', getAllMedia);

mediaRouter.get('/:id', getSingleMedia);

mediaRouter.get('/uploads/:s3Key', getMediaFile);

mediaRouter.patch('/:id', updateMedia);

mediaRouter.post('/upload', upload.single('file'), uploadMedia);

mediaRouter.delete('/delete/:id', deleteMedia);

export default mediaRouter;