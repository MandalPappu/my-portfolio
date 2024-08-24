// import { EmailTemplate } from '../../emails/VisitorEmail';
// import { Resend } from 'resend';
// import { IVisitorDetails } from '@/components/Uploads/UploadVisitorMessage';

// const resend = new Resend(process.env.RESEND_API_KEY!);

// const mailReciever = (process.env.MAIL_RECIEVER!)?.toString()
// export async function sendingEmail({ visitorEmail, visitorMessage,
//     visitorName
// }:IVisitorDetails) {
//     try {
//         const res = await resend.emails.send({
//             from: 'dummy.com',
//             to: mailReciever || "",
//             subject: 'portFolio website visitor mail',
//             react: EmailTemplate({ visitorName, visitorEmail, visitorMessage }) as React.ReactElement,
//         });
//         console.log(res);
        
//         return {success:true, message:"message send successfully", }
//     } catch (emailerror) {
//         console.log("visitor mail sending error: ", emailerror);
//         return { success: false, message: 'Failed to send email.' };
//     }

// }

