import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        marketing_consent: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Newsletter', newsletterSchema);