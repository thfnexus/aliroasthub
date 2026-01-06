import { prisma } from "@/lib/prisma";
import { Globe, Shield, Zap, Server } from "lucide-react";
import HostingPlans from "@/components/HostingPlans";

export const dynamic = 'force-dynamic';

export default async function DomainHostingPage() {
    // Fetch Hosting Plans
    const hostingPlans = await prisma.course.findMany({
        where: { category: 'HOSTING' },
        orderBy: { price: 'asc' } // PLUS -> DELUXE -> ULTIMATE
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Premium Hosting & Domain
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        High-performance infrastructure for your business. Reliable hosting and domain solutions to scale your online presence.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: <Zap className="h-6 w-6" />, title: "Ultra Fast", desc: "NVMe Storage" },
                        { icon: <Shield className="h-6 w-6" />, title: "Secure", desc: "Free SSL certificates" },
                        { icon: <Globe className="h-6 w-6" />, title: "Global CDN", desc: "Faster load times" },
                        { icon: <Server className="h-6 w-6" />, title: "99.9% Uptime", desc: "Reliable service" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{item.title}</h3>
                                <p className="text-sm text-foreground/60">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hosting Plans Section */}
                <div id="hosting" className="mb-24 scroll-mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Choose Your Plan</h2>
                        <p className="text-foreground/60">Select the perfect hosting solution for your website.</p>
                    </div>

                    <HostingPlans plans={hostingPlans} />
                </div>

                {/* FAQ or Additional Info could go here */}
            </div>
        </div>
    );
}
