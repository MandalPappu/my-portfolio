import { EmailTemplate } from '../../emails/VisitorEmail';
import { Resend } from 'resend';
import { IVisitorDetails } from '@/components/Uploads/UploadVisitorMessage';

const resend = new Resend(process.env.RESEND_API_KEY);

const mailReciever = (process.env.MAIL_RECIEVER)?.toString()
export async function sendingEmail({ visitorEmail, visitorMessage,
    visitorName
}:IVisitorDetails) {
    try {
         await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: mailReciever || "",
            subject: 'portFolio website visitor mail',
            react: EmailTemplate({ visitorName, visitorEmail, visitorMessage }) as React.ReactElement,
         });
        return {success:true, message:"message send successfully", }
    } catch (emailerror) {
        console.log("visitor mail sending error: ", emailerror);
        return { success: false, message: 'Failed to send email.' };
    }

}

