import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookOpen, Clock, Users, Star, CheckCircle, Shield, ShoppingCart, Award, User } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = await prisma.course.findUnique({
        where: { id }
    });

    if (!course) {
        notFound();
    }

    // Helper to extract sections from markdown
    const getSection = (content: string, header: string) => {
        // Try precise match first
        let parts = content.split(`# ${header}`);

        // Fallback for smart/straight quote mismatch if simple split fails
        if (parts.length < 2 && header.includes("'")) {
            parts = content.split(`# ${header.replace("'", "’")}`);
        }
        if (parts.length < 2 && header.includes("’")) {
            parts = content.split(`# ${header.replace("’", "'")}`);
        }

        if (parts.length < 2) return null;
        return parts[1].split('#')[0].trim();
    };

    const overview = getSection(course.content || '', 'Course Overview') || course.description;
    const whatYouWillLearn = getSection(course.content || '', 'What You’ll Learn'); // Matches seed which uses ’
    const whoIsThisFor = getSection(course.content || '', 'Who This Course Is For');
    const features = getSection(course.content || '', 'Course Features');
    const instructorRaw = getSection(course.content || '', 'Instructor');

    // Parse Instructor Name and Bio
    const instructorLines = instructorRaw ? instructorRaw.split('\n').filter(l => l.trim()) : [];
    const instructorName = instructorLines[0]?.replace(/\*\*/g, '') || "Ali Roast Hub Team";
    const instructorBio = instructorLines.slice(1).join(' ') || "Industry-focused trainers.";

    return (
        <div className="min-h-screen pb-20 bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white relative overflow-hidden">
                <div className={`absolute inset-0 ${course.imageUrl} opacity-20 blur-3xl scale-125`}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* Left Content */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                                <Star className="fill-current h-4 w-4" />
                                <span>{course.rating} Rating</span>
                                <span className="text-white/40">•</span>
                                <span>{course.students?.toLocaleString()} Students</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{course.description}</p>

                            <div className="flex flex-wrap gap-6 text-sm font-medium pt-2 text-white/70">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    <span>Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{instructorName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Purchase Card (Inside Hero) */}
                        <div className="w-full max-w-sm shrink-0">
                            <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                                <div className={`h-48 ${course.imageUrl?.startsWith('http') ? '' : 'bg-slate-800'} relative`}>
                                    {course.imageUrl?.startsWith('http') ? (
                                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="h-16 w-16 text-white/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Lifetime Access</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-end gap-3 mb-6">
                                        <div className="text-3xl font-black text-primary">PKR {course.price.toLocaleString()}</div>
                                        <div className="text-sm text-foreground/40 font-medium line-through mb-1.5 ">PKR {(course.price * 1.5).toLocaleString()}</div>
                                    </div>

                                    <Link href={`/courses/${course.id}/checkout`} className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25 mb-4">
                                        <ShoppingCart className="h-5 w-5" /> Buy Now
                                    </Link>

                                    <div className="space-y-3 text-sm text-foreground/60">
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                            <span>30-Day Money-Back Guarantee</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                            <span>Full Lifetime Access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                            <span>Access on Mobile and TV</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content (Left, 2 cols wide) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* What you'll learn */}
                        {whatYouWillLearn && (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-8 rounded-2xl shadow-sm">
                                <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {whatYouWillLearn.split('\n').map((line, i) => {
                                        const clean = line.replace('- ', '').trim();
                                        if (!clean) return null;
                                        return (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground/80">{clean}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Overview */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Course Overview</h2>
                            <div className="prose dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                {overview}
                            </div>
                        </div>

                        {/* Syllabus / Modules */}
                        {(() => {
                            const syllabusRaw = getSection(course.content || '', 'Syllabus');
                            if (!syllabusRaw) return null;

                            interface CourseModule {
                                title: string;
                                content: string;
                            }

                            const modules: CourseModule[] = [];
                            let currentModule: CourseModule | null = null;

                            syllabusRaw.split('\n').forEach(line => {
                                const trim = line.trim();
                                if (!trim) return;

                                if (trim.startsWith('- Module')) {
                                    if (currentModule) modules.push(currentModule);
                                    currentModule = { title: trim.replace('- ', ''), content: '' };
                                } else if (currentModule) {
                                    currentModule.content += (currentModule.content ? ' ' : '') + trim;
                                }
                            });
                            if (currentModule) modules.push(currentModule);

                            return (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Course Content</h2>
                                    <div className="space-y-4">
                                        {modules.map((mod, i) => (
                                            <div key={i} className="group border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-between cursor-default">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                                            <BookOpen className="h-5 w-5" />
                                                        </div>
                                                        <span className="font-bold text-lg">{mod.title}</span>
                                                    </div>
                                                </div>
                                                {mod.content && (
                                                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 text-foreground/70 text-sm leading-relaxed">
                                                        {mod.content}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Features */}
                        {features && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Course Features</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {features.split('\n').map((line, i) => {
                                        const clean = line.replace('- ', '').trim();
                                        if (!clean) return null;
                                        return (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                                                <Award className="h-5 w-5 text-primary" />
                                                <span className="font-medium">{clean}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Target Audience */}
                        {whoIsThisFor && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Who this course is for</h2>
                                <ul className="space-y-2 list-disc pl-5 text-foreground/80">
                                    {whoIsThisFor.split('\n').map((line, i) => {
                                        const clean = line.replace('- ', '').trim();
                                        if (!clean) return null;
                                        return <li key={i}>{clean}</li>
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar (Right, 1 col wide) */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Instructor Card */}
                        <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 p-6">
                            <h3 className="text-lg font-bold mb-4">Instructor</h3>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                    <User className="h-6 w-6 text-foreground/50" />
                                </div>
                                <div>
                                    <div className="font-bold text-primary underline underline-offset-4 mb-2 cursor-pointer">{instructorName}</div>
                                    <p className="text-sm text-foreground/70 leading-relaxed">{instructorBio}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Purchase Bar (Sticky Bottom) - Only visible on small screens */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10 flex items-center justify-between z-50 shadow-upper">
                <div>
                    <p className="text-xs text-foreground/50 font-bold uppercase">Total Price</p>
                    <p className="text-xl font-black text-primary">PKR {course.price.toLocaleString()}</p>
                </div>
                <Link href={`/courses/${course.id}/checkout`} className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg">Buy Now</Link>
            </div>
        </div>
    );
}
