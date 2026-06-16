import mongoose from 'mongoose';

const exceptionLogSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },
        stacktrace: {
            type: String,
            default: '',
        },
        device_details: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        },
        count: {
            type: Number,
            default: 1,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'exception_logs',
    }
);

export default mongoose.model('ExceptionLog', exceptionLogSchema);