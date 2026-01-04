// Server Component
import { prisma } from "@/lib/prisma";
import { ArrowRight, BookOpen, Clock, Users, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export const revalidate = 0; // Ensure fresh data on every request

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({
        where: { category: 'COURSE' },
        orderBy: { updatedAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Premium Courses</h1>
                <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                    Upskill yourself with our signature lifetime access programs.
                </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course: any) => (
                    <div key={course.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        {/* Image Area */}
                        {/* Check if imageUrl is a URL or a class string */}
                        <div className={`h-48 relative ${!course.imageUrl?.startsWith('http') ? (course.imageUrl || 'bg-slate-100') : 'bg-slate-50'}`}>
                            {course.imageUrl?.startsWith('http') ? (
                                <img
                                    src={course.imageUrl}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <BookOpen className="h-16 w-16 text-white" />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-lg shadow-lg font-bold text-sm text-primary">
                                PKR {course.price.toLocaleString()}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex-grow flex flex-col">
                            <h2 className="text-lg font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                {course.title}
                            </h2>
                            <p className="text-sm text-foreground/60 mb-4 line-clamp-2 flex-grow">
                                {course.description}
                            </p>

                            {/* Metadata */}
                            <div className="flex items-center gap-4 text-xs text-foreground/50 mb-6 font-medium">
                                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students?.toLocaleString()} Students</span>
                                <span className="flex items-center gap-1 text-yellow-500"><Star className="h-3.5 w-3.5 fill-current" /> {course.rating}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-auto">
                                <Link href={`/courses/${course.id}/checkout`} className="flex-1 py-3 bg-primary text-white text-center rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                    <ShoppingCart className="h-4 w-4" /> Buy Now
                                </Link>
                                <Link href={`/courses/${course.id}`} className="flex-1 py-3 bg-slate-100 text-foreground text-center rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                    View Details
                                </Link>
                            </div >
                        </div >
                    </div >
                ))}
            </div >
        </div >
    );
}
