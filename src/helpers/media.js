import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { AWS_S3_BUCKET } from '../config/env.js';
import s3Client from '../config/s3.js';

export const getMediaUrl = async (key, url = true) => {
    const command = new GetObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
    });

    if (!url) {
        return await s3Client.send(command);
    }

    return getSignedUrl(s3Client, command, {
        expiresIn: 3600, // 1 hour
    });
};