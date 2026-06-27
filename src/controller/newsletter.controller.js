import Newsletter from "../modal/newsletter.modal.js";

export const createNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await Newsletter.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: 'Email already used',
            });
        }

        const contact = await Newsletter.create({ email });

        return res.status(201).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create newsletter",
        });
    }
};