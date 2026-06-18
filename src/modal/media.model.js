import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        s3Key: {
            type: String,
            required: true,
            unique: true,
        },
        url: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        extension: {
            type: String,
        },
        size: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            default: null,
        },
        height: {
            type: Number,
            default: null,
        },
        bucket: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
            default: '',
            trim: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Media', mediaSchema);