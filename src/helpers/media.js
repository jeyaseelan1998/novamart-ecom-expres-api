import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import s3Client from '../config/s3.js';

export const getMediaUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    });

    return getSignedUrl(s3Client, command, {
        expiresIn: 3600, // 1 hour
    });
};