
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PaymentVerificationEmailProps {
    adminEmail: string;
    userName: string;
    userEmail: string;
    courseTitle: string;
    trxId: string;
    price: number;
    screenshotName: string;
    screenshotBuffer?: Buffer | null;
}

export async function sendPaymentVerificationEmail({
    adminEmail,
    userName,
    userEmail,
    courseTitle,
    trxId,
    price,
    screenshotName,
    screenshotBuffer
}: PaymentVerificationEmailProps) {
    try {
        const attachments = screenshotBuffer ? [{
            filename: screenshotName,
            content: screenshotBuffer
        }] : [];

        await resend.emails.send({
            from: 'Ali Roast Hub <onboarding@resend.dev>',
            to: adminEmail,
            subject: `Payment Verification: ${userName} - ${trxId}`, // Added TRX directly to subject for visibility
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">New Payment Verification Request</h2>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
                <p>Hello Admin,</p>
                <p>A new payment has been submitted for verification. Please review the details below:</p>
                
                <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
                    <p><strong>User:</strong> ${userName}</p>
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Course/Service:</strong> ${courseTitle}</p>
                    <p><strong>Amount:</strong> PKR ${price.toLocaleString()}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                    <p style="font-size: 16px;"><strong>TRX ID:</strong> <span style="font-family: monospace; background: #eee; padding: 4px 8px; border-radius: 3px; font-weight: bold;">${trxId}</span></p>
                    <p><strong>Screenshot:</strong> ${screenshotName} ${screenshotBuffer ? "(Attached)" : "(Not Attached)"}</p>
                </div>

                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Admin Dashboard</a>
            </div>
            <div style="padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                Ali Roast Hub Payment System
            </div>
        </div>
      `,
            attachments: attachments
        });
        return { success: true };
        return { success: true };
    } catch (error) {
        console.error("Failed to send verification email:", error);
        return { success: false, error };
    }
}
