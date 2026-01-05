
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
            from: 'Ali Roast Hub <no-reply@aliroasthub.com>',
            to: adminEmail,
            subject: `Payment Verification: ${userName} - ${trxId}`,
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
    } catch (error) {
        console.error("Failed to send payment email:", error);
        return { success: false, error };
    }
}

export async function sendVerificationEmail(email: string, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aliroasthub.com';
    const confirmLink = `${baseUrl}/api/auth/verify?token=${token}`;
    console.log(`Attempting to send verification email to ${email}...`);
    console.log(`Link: ${confirmLink}`);

    try {
        const data = await resend.emails.send({
            from: 'Ali Roast Hub <no-reply@aliroasthub.com>',
            to: email,
            subject: "Verify your email - Ali Roast Hub",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">Email Verification</h2>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
                <p>Hello,</p>
                <p>Thank you for signing up for Ali Roast Hub. To get started, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${confirmLink}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Verify Email Address</a>
                </div>

                <p style="font-size: 14px; color: #666;">If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="font-size: 14px; color: #000; word-break: break-all;">${confirmLink}</p>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">If you did not create an account, no further action is required.</p>
            </div>
            <div style="padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                Ali Roast Hub &copy; 2026
            </div>
        </div>
      `
        });
        console.log("Resend response:", data);
        return { success: !!data.data?.id };
    } catch (error) {
        console.error("Failed to send verification email:", error);
        return { success: false, error };
    }
}
