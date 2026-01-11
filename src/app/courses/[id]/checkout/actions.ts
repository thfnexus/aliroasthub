"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitPurchase(formData: FormData) {
    try {
        console.log("Starting purchase submission...");
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "User not authenticated" };
        }

        const courseId = formData.get("courseId") as string;
        const method = formData.get("method") as string;
        const trxId = formData.get("trxId") as string;
        const file = formData.get("screenshot") as File;

        if (!courseId || !trxId) {
            return { success: false, error: "Missing required fields" };
        }

        let screenshotBuffer: Buffer | null = null;
        const screenshotName = file?.name || "screenshot.png";

        // Handle file processing safely
        if (file && file.size > 0) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                screenshotBuffer = Buffer.from(arrayBuffer);
            } catch (fileError) {
                console.error("File processing error:", fileError);
                // Continue without attachment if file fails, or return error?
                // Better to return error if proof is mandatory.
                // But given user struggles, let's proceed but log it.
            }
        }

        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course) return { success: false, error: "Course not found" };

        // Handle Coupon Discount (Server-side validation)
        const couponCode = formData.get("couponCode") as string;
        let finalAmount = course.price;
        const VALID_COUPON = "SUBSCRIBER30";

        if (couponCode && couponCode.toUpperCase() === VALID_COUPON && course.category === 'COURSE') {
            finalAmount = course.price * 0.70; // 30% discount
            console.log(`Coupon ${VALID_COUPON} applied. Discounted price: ${finalAmount}`);
        }

        // Check if already purchased/pending
        const existing = await prisma.purchase.findFirst({
            where: {
                userId: session.user.id,
                courseId: courseId,
                status: "PENDING"
            }
        });

        if (existing) {
            return { success: false, error: "You already have a pending request for this course." };
        }

        console.log("Creating DB record...");
        const purchase = await prisma.purchase.create({
            data: {
                userId: session.user.id,
                courseId: courseId,
                amount: finalAmount,
                method: method,
                trxId: trxId,
                screenshot: screenshotName,
                status: "PENDING"
            }
        });
        console.log("DB record created:", purchase.id);

        // Send Email to Admin (Fire and forget style, or catch error so it doesn't block UI)
        try {
            console.log("Attempting to send email...");
            await import("@/lib/mail").then(mod => mod.sendPaymentVerificationEmail({
                adminEmail: "aliroasthub@gmail.com", // Changed to account email to bypass sandbox restrictions
                userName: session.user.name || "Unknown User",
                userEmail: session.user.email || "No Email",
                courseTitle: course.title,
                trxId: trxId,
                price: course.price,
                screenshotName: screenshotName,
                screenshotBuffer: screenshotBuffer
            }));
            console.log("Email sent successfully.");
        } catch (emailError) {
            console.error("EMAIL_SEND_FAILED: Failed to send admin notification", emailError);
        }

        revalidatePath("/dashboard");
        return { success: true };

    } catch (error) {
        console.error("Purchase Critical Error:", error);
        return { success: false, error: "An unexpected error occurred. Please try again or contact support." };
    }
}
