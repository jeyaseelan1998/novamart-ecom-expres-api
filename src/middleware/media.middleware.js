import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: process.env.AWS_MAX_UPLOAD_SIZE * 1024 * 1024,
    },
});

export default upload;