import multer from 'multer';
import { AWS_MAX_UPLOAD_SIZE } from '../config/env.js';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: AWS_MAX_UPLOAD_SIZE * 1024 * 1024,
    },
});

export default upload;