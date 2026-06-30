import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            trim: true,
            default: ''
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        to: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        state: {
            type: Number,
            default: 0,
        },
        mailgun_log_id: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        collection: 'email_logs',
    }
);

export default mongoose.model('EmailLog', emailLogSchema);