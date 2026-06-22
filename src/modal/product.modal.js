import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", productSchema);