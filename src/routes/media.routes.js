import express from 'express';

import upload from '../middleware/media.middleware.js';
import {
    uploadImage,
    deleteImage,
    getAllImages
} from '../controller/media.controller.js';

const mediaRouter = express.Router();

mediaRouter.get('/', getAllImages);

mediaRouter.post('/upload', upload.single('image'), uploadImage);

mediaRouter.delete('/delete', deleteImage);

export default mediaRouter;