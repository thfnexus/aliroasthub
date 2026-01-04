import { RotateCcw, ShieldCheck, Heart } from "lucide-react";

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 overflow-x-hidden relative">
            <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-green-500/10 text-green-500 mb-6">
                        <RotateCcw className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
                        Refund Policy
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        We want you to be completely satisfied with your learning journey.
                    </p>
                </header>

                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl space-y-8 text-foreground/80 leading-relaxed">

                    {/* Hero Highlight for Guarantee */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="h-20 w-20 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                            <ShieldCheck className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-green-700 mb-2">30-Day Money-Back Guarantee</h2>
                            <p className="text-green-800/70">
                                If you are not satisfied with your purchase for any reason, you can request a full refund within 30 days of your purchase date. No questions asked.
                            </p>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Eligibility for Refunds</h2>
                        <p className="mb-4">
                            To be eligible for a refund:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You must submit your request within 30 days of the purchase date.</li>
                            <li>You must not have completed more than 50% of the course content (for courses).</li>
                            <li>For services, the refund policy applies if the service has not yet been significantly delivered or commenced.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <RotateCcw className="h-5 w-5 text-green-500" />
                            2. How to Request a Refund
                        </h2>
                        <p>
                            To request a refund, please contact our support team at <a href="mailto:help@aliroasthub.com" className="text-primary hover:underline font-medium">help@aliroasthub.com</a> with your order details and transaction ID. We will process your request within 3 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. Late or Missing Refunds</h2>
                        <p>
                            If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, as it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500" />
                            4. Our Commitment
                        </h2>
                        <p>
                            We build our courses and services with heart. If you have feedback on how we can improve, please let us know. We value your input and legitimate satisfaction above all else.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
