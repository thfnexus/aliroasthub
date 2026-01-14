import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url));
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: { not: null }
            },
        });

        if (!user) {
            return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url));
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
            },
        });

        return NextResponse.redirect(new URL("/login?verified=true", req.url));
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.redirect(new URL("/login?error=VerificationFailed", req.url));
    }
}
