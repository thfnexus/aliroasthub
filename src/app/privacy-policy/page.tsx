import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 overflow-x-hidden relative">
            <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-500/10 text-blue-500 mb-6">
                        <Lock className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Your privacy is critically important to us. Included here is our commitment to protecting your personal data.
                    </p>
                </header>

                <div className="glass p-8 md:p-12 rounded-[2rem] border-white/20 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl space-y-8 text-foreground/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            1. Information We Collect
                        </h2>
                        <p className="mb-4">
                            We collect information you provide directly to us when you register for an account, purchase a course, or contact consumer support. This may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Name, email address, and phone number.</li>
                            <li>Payment information (transactions are secure and encrypted).</li>
                            <li>Course progress and enrollment data.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Eye className="h-5 w-5 text-blue-500" />
                            2. How We Use Your Information
                        </h2>
                        <p className="mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve our services and courses.</li>
                            <li>Process transactions and send related information, including confirmations and invoices.</li>
                            <li>Send technical notices, updates, security alerts, and support and administrative messages.</li>
                            <li>Respond to your comments, questions, and requests.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect specific personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Sharing of Information</h2>
                        <p>
                            We do not share your personal information with third parties except as described in this policy, such as with vendors who need access to such information to carry out work on our behalf (e.g., payment processors, email service providers).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="/contact" className="text-blue-500 hover:underline">help@aliroasthub.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
