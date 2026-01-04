import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-10">My Profile</h1>
            <ProfileForm user={{
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as string
            }} />
        </div>
    );
}
