import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

import { EMAIL_FAILED, EMAIL_PENDING, EMAIL_QUEUED, trackEmailState } from "../helpers/email.js";

export async function sendEmail({
    fullname,
    email,
    subject,
    text,
}) {
    const emailTrackID = await trackEmailState({ fullname, to: email, subject, text, state: EMAIL_PENDING });
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY,
        // When you have an EU-domain, you must specify the endpoint:
        // url: "https://api.eu.mailgun.net"
    });
    try {
        const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            to: ["Jeyaseelan R <jeya.seelan1998@gmail.com>"],
            subject,
            text,
            "v:emailLogId": emailTrackID.toString(),
        });
        await trackEmailState({ id: emailTrackID, state: EMAIL_QUEUED, mailgun_log_id: data?.id });
        console.log(data); // logs response data
        // {
        //     status: 200,
        //     id: '<20260630022942.628e210483919159@sandboxb5cbf5cd34304ea4a70af7123e3c21e2.mailgun.org>',
        //     message: 'Queued. Thank you.'
        // }
    } catch (error) {
        await trackEmailState({ id: emailTrackID, state: EMAIL_FAILED });
        console.log(error); //logs any error
        return new Error(error.message);
    }
}