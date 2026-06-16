import ExceptionLog from '../modal/Error.modal.js';

export const createExceptionLog = async (req, res) => {
    try {
        const { message, stacktrace, device_details, url, type } = req.body;

        const log = await ExceptionLog.findOneAndUpdate(
            { message, url, type },
            {
                $inc: { count: 1 },
                $setOnInsert: {
                    message,
                    stacktrace,
                    device_details,
                    url,
                    type,
                },
                $set: {
                    updatedAt: new Date(),
                },
            },
            {
                upsert: true,
                new: true,
            }
        );

        return res.status(200).json({
            success: true,
            data: log,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};