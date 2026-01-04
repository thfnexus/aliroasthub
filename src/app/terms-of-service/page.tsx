import { FileText, Gavel, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 overflow-x-hidden relative">
            <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-purple-500/10 text-purple-500 mb-6">
                        <FileText className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        By accessing or using Ali Roast Hub, you agree to be bound by these terms. Please read them carefully.
                    </p>
                </header>

                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl space-y-8 text-foreground/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Gavel className="h-5 w-5 text-purple-500" />
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, simply do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Course Usage</h2>
                        <p className="mb-4">
                            When you purchase a course, you are granted a limited, non-exclusive, non-transferable license to access and view the course content for your personal, non-commercial use.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You may not share your account credentials with others.</li>
                            <li>You may not redistribute, resell, or publicly display course materials.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-purple-500" />
                            3. User Conduct
                        </h2>
                        <p>
                            You agree not to engage in any activity that interferes with or disrupts our services or servers. Hacking, scraping, or any form of unauthorized access is strictly prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
                        <p>
                            All content, trademarks, and data on this site, including but not limited to software, databases, text, graphics, icons, hyperlinks, private information, designs, and agreements, are the property of or licensed to Ali Roast Hub.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer</h2>
                        <p>
                            Our courses are provided "as is" without warranty of any kind. While we strive for excellence, we do not guarantee specific results or outcomes from taking our courses.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
