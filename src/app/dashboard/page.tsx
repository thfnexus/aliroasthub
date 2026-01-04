import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BookOpen, Settings, ExternalLink, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    // specific user check
    const allCourses = await prisma.course.findMany({
        include: {
            enrollments: {
                where: {
                    userId: session.user.id
                }
            }
        }
    });

    // Filter to only show enrolled courses
    const myCourses = allCourses.filter(course => course.enrollments.length > 0);
    const enrolledCount = myCourses.length;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-foreground/60">Welcome back, {session.user.name || "Explorer"}!</p>
                </div>
                {/* Stats or Actions could go here */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* My Courses Section */}
                <section className="glass p-8 rounded-[2rem] border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen className="text-primary h-6 w-6" /> My Courses
                        </h2>
                        <Link href="/courses" className="text-primary text-sm font-bold hover:underline">
                            Browse Catalog
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {myCourses.length > 0 ? (
                            myCourses.map((course) => (
                                <div key={course.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-white/5 transition-all hover:scale-[1.02]">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <BookOpen className="h-6 w-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-sm">{course.title}</h3>
                                        <p className="text-xs text-foreground/50">
                                            Status: Active (Lifetime Access)
                                        </p>
                                    </div>
                                    <Link
                                        href={course.title === "Pay Per Call Mastery Program" ? "https://docs.google.com/document/d/1SeaTPgZjteZIw2a9phRkTcYfdNklkq98emdHrPaoyXI/edit?usp=sharing" : `/courses/${course.id}`}
                                        target={course.title === "Pay Per Call Mastery Program" ? "_blank" : undefined}
                                        className="p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5 text-primary"
                                        title="Access Course Content"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                                <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                                <p className="text-foreground/60 font-medium text-sm">You haven't purchased any courses yet.</p>
                                <Link href="/courses" className="inline-flex items-center gap-2 mt-4 text-xs font-bold bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all">
                                    Browse Courses <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* My Services Section */}
                <section className="glass p-8 rounded-[2rem] border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Settings className="text-secondary h-6 w-6" /> My Services
                        </h2>
                        <Link href="/services" className="text-secondary text-sm font-bold hover:underline">
                            New Request
                        </Link>
                    </div>
                    <div className="text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                        <Settings className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-foreground/60 font-medium text-sm">No active services.</p>
                        <Link href="/services" className="inline-flex items-center gap-2 mt-4 text-xs font-bold bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-all">
                            View Services <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </section>
            </div>

            {/* Quick Actions / Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-2xl border-white/10 text-center">
                    <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Active Courses</p>
                    <p className="text-3xl font-black text-primary">{enrolledCount}</p>
                </div>
                <div className="glass p-6 rounded-2xl border-white/10 text-center">
                    <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Active Services</p>
                    <p className="text-3xl font-black text-secondary">0</p>
                </div>
                <div className="glass p-6 rounded-2xl border-white/10 text-center">
                    <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Account Status</p>
                    <p className="text-3xl font-black text-accent capitalize">{session.user.role.toLowerCase()}</p>
                </div>
            </div>
        </div>
    );
}
