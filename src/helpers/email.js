import EmailLog from '../modal/emailLog.modal.js';

export const EMAIL_PENDING = 0;
export const EMAIL_QUEUED = 1;
export const EMAIL_SUCCESS = 2;
export const EMAIL_FAILED = 3;

export const trackEmailState = async ({ to, subject, text, state, id, mailgun_log_id }) => {
    if (id) {
        const email = await EmailLog.findByIdAndUpdate(
            id,
            { state, mailgun_log_id },
            { returnDocument: "after" }
        );

        return email?._id;
    }

    const email = await EmailLog.create({
        to,
        subject,
        text,
        state,
    });

    return email._id;
};