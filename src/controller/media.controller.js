import { randomUUID } from 'crypto';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

import s3Client from '../config/s3.js';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const file = req.file;

        const key = `uploads/${randomUUID()}-${file.originalname}`;

        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        return res.status(200).json({
            success: true,
            data: {
                key,
                imageUrl,
            },
        });
    } catch (error) {
        console.error('S3 Upload Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const { key } = req.body;

        if (!key) {
            return res.status(400).json({
                success: false,
                message: 'File key is required',
            });
        }

        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
            })
        );

        return res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
        });
    } catch (error) {
        console.error('S3 Delete Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllImages = async (req, res) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET,
            Prefix: 'uploads/', // optional folder filter
        });

        const response = await s3Client.send(command);

        const images = (response.Contents || []).map((file) => ({
            key: file.Key,
            size: file.Size,
            lastModified: file.LastModified,
            imageUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
        }));

        return res.status(200).json({
            success: true,
            count: images.length,
            data: images,
        });
    } catch (error) {
        console.error('Get Images Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};