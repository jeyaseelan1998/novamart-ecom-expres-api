import Product from "../modal/product.modal.js";

export const getProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            search,
            minPrice,
            maxPrice,
            minRating,
            sort = "newest",
        } = req.query;

        const filter = {
            isActive: true,
        };

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        if (minRating) {
            filter.rating = {
                $gte: Number(minRating),
            };
        }

        const sortOptions = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            priceAsc: { price: 1 },
            priceDesc: { price: -1 },
            ratingDesc: { rating: -1 },
        };

        const skip = (Number(page) - 1) * Number(limit);

        const [products, total] = await Promise.all([
            Product.find(filter)
                .populate("image")
                .sort(sortOptions[sort] || sortOptions.newest)
                .skip(skip)
                .limit(Number(limit)),
            Product.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            list: products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: skip + products.length < total,
                hasPreviousPage: Number(page) > 1,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate("image");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        return res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create product",
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).populate("image");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
};