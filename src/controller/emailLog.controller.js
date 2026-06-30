import { trackEmailState } from '../helpers/email.js';

export const updateEmailState = async (req, res) => {
    try {
        const { id, state } = req.body;

        console.log("===========");
        console.log(req.body);

        if (!id || !state) {
            return res.status(200).json({
                success: false,
                message: "Email id and state are required.",
            });
        }

        const emailId = await trackEmailState({ id, state });

        if (!emailId) {
            return res.status(200).json({
                success: false,
                message: "Email log not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email state updated successfully.",
            data: {
                id: emailId,
                state,
            },
        });
    } catch (error) {
        console.error("Error updating email state:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update email state.",
            error: error.message,
        });
    }
};