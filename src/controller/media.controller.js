import path from 'path';
import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { getMediaUrl } from '../helpers/media.js';
import s3Client from '../config/s3.js';
import Media from '../modal/media.model.js';

export const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const file = req.file;

        const fileName = `${randomUUID()}-${file.originalname}`;
        const key = `uploads/${fileName}`;

        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        const url = await getMediaUrl(key);

        const media = await Media.create({
            originalName: file.originalname,
            fileName,
            s3Key: key,
            url,
            mimeType: file.mimetype,
            extension: path.extname(file.originalname),
            size: file.size,
            bucket: process.env.AWS_S3_BUCKET,
            uploadedBy: req.user?._id || null,
        });

        return res.status(201).json({
            success: true,
            data: media,
        });
    } catch (error) {
        console.error('Upload Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid media ID',
            });
        }

        const media = await Media.findById(id);

        if (!media) {
            return res.status(404).json({
                success: false,
                message: 'Media not found',
            });
        }

        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: media.s3Key,
            })
        );

        await Media.deleteOne({ _id: id });

        return res.status(200).json({
            success: true,
            message: 'Media deleted successfully',
        });
    } catch (error) {
        console.error('Delete Media Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllMedia = async (req, res) => {
    try {
        const { type } = req.query;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = {};

        if (type === 'image') {
            filter.mimeType = { $regex: '^image/' };
        } else if (type === 'video') {
            filter.mimeType = { $regex: '^video/' };
        } else if (type === 'pdf') {
            filter.mimeType = 'application/pdf';
        }

        const [media, total] = await Promise.all([
            Media.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Media.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            data: media,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get Media Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSingleMedia = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid media ID',
            });
        }

        const media = await Media.findById(id).lean();

        if (!media) {
            return res.status(404).json({
                success: false,
                message: 'Media not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: media,
        });
    } catch (error) {
        console.error('Get Single Media Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};