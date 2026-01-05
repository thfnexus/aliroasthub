import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
                emailVerified: false,
            },
        });

        // Send verification email
        let mailSent = false;
        try {
            const { sendVerificationEmail } = await import("@/lib/mail");
            const mailResult = await sendVerificationEmail(email, verificationToken);
            mailSent = mailResult.success;
        } catch (mailError) {
            console.error("Failed to send verification email:", mailError);
        }

        if (!mailSent) {
            return NextResponse.json(
                { message: "Account created successfully! However, we couldn't send the verification email automatically. Our team is working to fix the delivery issues.", userId: user.id },
                { status: 201 }
            );
        }

        return NextResponse.json(
            { message: "Account created! Please check your email inbox (and spam folder) for a verification link. You must verify your email before you can login.", userId: user.id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
