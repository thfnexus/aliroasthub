"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserName(newName: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    if (!newName || newName.trim().length < 2) {
        return { success: false, error: "Name must be at least 2 characters long." };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { name: newName.trim() },
        });

        revalidatePath("/dashboard/profile");
        revalidatePath("/dashboard"); // Update sidebar name as well
        return { success: true };
    } catch (error) {
        console.error("Failed to update name:", error);
        return { success: false, error: "Failed to update profile." };
    }
}
