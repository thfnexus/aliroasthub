import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Cpu, Shield, Globe, Zap, Layers, Server, Check, ShoppingCart } from "lucide-react";
import HostingPlans from "./HostingPlans";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    // 1. Fetch Services (MarketCall, Offer Approval)
    const services = await prisma.course.findMany({
        where: { category: 'SERVICE' },
        orderBy: { price: 'desc' }
    });

    // 2. Fetch Hosting Plans
    const hostingPlans = await prisma.course.findMany({
        where: { category: 'HOSTING' },
        orderBy: { price: 'asc' } // PLUS -> DELUXE -> ULTIMATE
    });

    const premiumServices = services.filter(s => s.price > 0);
    const marketingServices = services.filter(s => s.price === 0);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Enterprise Solutions
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Scale your operations with our verified offer approval systems, premium dashboards, and high-performance hosting.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">

                {/* Premium Services Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {premiumServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 flex flex-col md:flex-row gap-8 items-center hover:-translate-y-1 transition-transform duration-300">
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 ${service.imageUrl?.includes('emerald') || service.imageUrl === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                {service.title.includes('MarketCall') ? <Cpu className="h-10 w-10" /> : <Shield className="h-10 w-10" />}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                <p className="text-foreground/60 mb-6">{service.description}</p>
                                <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                                    <div className="text-3xl font-black text-slate-900">
                                        PKR {service.price.toLocaleString()}
                                    </div>
                                    <Link href={`/courses/${service.id}/checkout`} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                                        <ShoppingCart className="h-4 w-4" /> Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hosting Plans Section */}
                <div id="hosting" className="mb-24 scroll-mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Hosting & Domain</h2>
                        <p className="text-foreground/60">Professional infrastructure for your business needs.</p>
                    </div>

                    <HostingPlans plans={hostingPlans} />
                </div>

                {/* Marketing & Development Section (Card Style like Hosting) */}
                {marketingServices.length > 0 && (
                    <div className="mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Digital Growth & Development</h2>
                            <p className="text-foreground/60">Specialized solutions for your online presence.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {marketingServices.map((service) => {
                                const whatsappNumber = "923414270742";
                                const whatsappMsg = encodeURIComponent(`Hi, I am interested in the ${service.title} service. Please provide pricing and details.`);
                                const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

                                return (
                                    <div key={service.id} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 flex flex-col items-center text-center hover:border-primary transition-all duration-300">
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${service.imageUrl?.includes('emerald') || service.imageUrl === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                                            {service.title.includes('Web') ? <Globe className="h-10 w-10" /> :
                                                service.title.includes('Ads') ? <Zap className="h-10 w-10" /> :
                                                    <Layers className="h-10 w-10" />}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                        <p className="text-foreground/60 mb-8 flex-grow">
                                            {service.description}
                                        </p>
                                        <div className="w-full space-y-4 pt-6 border-t border-slate-100">
                                            <div className="text-primary font-bold">Pricing on WhatsApp</div>
                                            <a
                                                href={whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                                            >
                                                Contact on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
