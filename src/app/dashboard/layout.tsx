import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Settings, User, LogOut, Shield } from "lucide-react";
import { signOut } from "@/auth"; // We might need a client component for signout effectively or a server action

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col glass border-r border-white/10 sticky top-16 h-[calc(100vh-4rem)]">
                <div className="p-6 space-y-2">
                    <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-primary/10 text-foreground/80 hover:text-primary">
                        <span className="h-5 w-5"><LayoutDashboard /></span>
                        <span className="font-medium">Overview</span>
                    </Link>
                    <Link href="/courses" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-primary/10 text-foreground/80 hover:text-primary">
                        <span className="h-5 w-5"><BookOpen /></span>
                        <span className="font-medium">Courses Catalog</span>
                    </Link>
                    <Link href="/services" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-primary/10 text-foreground/80 hover:text-primary">
                        <span className="h-5 w-5"><Settings /></span>
                        <span className="font-medium">Services</span>
                    </Link>
                    <Link href="/dashboard/profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-primary/10 text-foreground/80 hover:text-primary">
                        <span className="h-5 w-5"><User /></span>
                        <span className="font-medium">Profile</span>
                    </Link>
                    {session.user.role === "ADMIN" && (
                        <Link href="/admin" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-500/10 text-red-500 hover:text-red-600 font-bold border border-red-500/10">
                            <span className="h-5 w-5"><Shield /></span>
                            <span className="font-medium">Admin Panel</span>
                        </Link>
                    )}
                </div>
                <div className="mt-auto p-6 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs border border-primary/20">
                            {session.user.name?.[0] || "U"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-xs truncate">{session.user.name}</p>
                            <p className="text-[10px] text-foreground/50 truncate">{session.user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
