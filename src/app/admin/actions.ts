"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function authorizeAdmin() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session;
}

export async function getUsers() {
    await authorizeAdmin();
    // Fetch users except current admin purely for cleaner UI, or just fetch all
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            enrollments: {
                include: {
                    course: true
                }
            }
        }
    });
    return users;
}

export async function getCourses() {
    await authorizeAdmin();
    return await prisma.course.findMany();
}

export async function assignCourse(userId: string, courseId: string) {
    await authorizeAdmin();

    try {
        await prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to assign course:", error);
        return { success: false, error: "Failed to assign course. User might already be enrolled." };
    }
}

export async function deleteUser(userId: string) {
    await authorizeAdmin();
    try {
        await prisma.user.delete({ where: { id: userId } });
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user:", error);
        return { success: false, error: "Failed to delete user." };
    }
}

export async function updateUserRole(userId: string, newRole: "ADMIN" | "USER") {
    await authorizeAdmin();
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update role:", error);
        return { success: false, error: "Failed to update user role." };
    }
}

export async function getPendingPurchases() {
    await authorizeAdmin();
    return await prisma.purchase.findMany({
        where: { status: "PENDING" },
        include: {
            user: true,
            course: true
        },
        orderBy: { createdAt: "desc" }
    });
}

export async function approvePurchase(purchaseId: string) {
    await authorizeAdmin();
    try {
        const purchase = await prisma.purchase.findUnique({
            where: { id: purchaseId },
            include: { user: true, course: true }
        });

        if (!purchase) return { success: false, error: "Purchase not found" };

        // 1. Update Purchase Status
        await prisma.purchase.update({
            where: { id: purchaseId },
            data: { status: "COMPLETED" }
        });

        // 2. Create Enrollment
        await prisma.enrollment.create({
            data: {
                userId: purchase.userId,
                courseId: purchase.courseId
            }
        });

        revalidatePath("/admin");
        return { success: true };

    } catch (error) {
        console.error("Failed to approve purchase:", error);
        return { success: false, error: "Failed to approve purchase." };
    }
}

export async function rejectPurchase(purchaseId: string) {
    await authorizeAdmin();
    try {
        await prisma.purchase.update({
            where: { id: purchaseId },
            data: { status: "REJECTED" }
        });

        revalidatePath("/admin");
        return { success: true };

    } catch (error) {
        console.error("Failed to reject purchase:", error);
        return { success: false, error: "Failed to reject purchase." };
    }
}
