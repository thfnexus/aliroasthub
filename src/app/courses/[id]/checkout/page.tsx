import { prisma } from "@/lib/prisma";
import CheckoutForm from "./CheckoutForm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) {
        redirect("/login?callbackUrl=/courses"); // Redirect to login if not authenticated
    }

    const { id } = await params;

    // We can fetch the course here to verify it exists and pass price to the client
    const course = await prisma.course.findUnique({
        where: { id: id }
    });

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-slate-900 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold mb-2">Checkout</h1>
                    <p className="text-white/60">Complete your purchase to verify enrollment.</p>
                </div>
            </div>

            {/* Wrapper passing params */}
            <CheckoutForm params={{ id }} />

            {/* Price Summary (can be integrated into form, but adding here for context) */}
            <div className="max-w-4xl mx-auto px-4 -mt-8 text-center">
                <div className="inline-block bg-white px-6 py-2 rounded-full shadow-lg border border-slate-100">
                    <span className="text-sm text-foreground/60 mr-2">Total Payable:</span>
                    <span className="text-xl font-bold text-primary">PKR {course.price.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
