import Link from "next/link";
import { Cpu, Shield, Globe, Zap, Layers, ShoppingCart, MessageCircle, BarChart, FileCheck } from "lucide-react";

export const dynamic = 'force-dynamic';

const ppcServices = [
    {
        id: "marketcall-dashboard",
        title: "Marketcall Dashboard Approval",
        description: "Get verified access to the Marketcall dashboard. We help you skip the line and get your account approved quickly.",
        icon: <BarChart className="h-10 w-10" />,
        color: "emerald"
    },
    {
        id: "marketcall-offer",
        title: "Marketcall Offer Approval",
        description: "Get your specific Marketcall offers approved without hassle. Start running your campaigns immediately.",
        icon: <FileCheck className="h-10 w-10" />,
        color: "blue"
    },
    {
        id: "resultcall-dashboard",
        title: "Resultcall Dashboard Approval",
        description: "Secure your Resultcall dashboard access with our guaranteed approval service. Start scaling today.",
        icon: <BarChart className="h-10 w-10" />,
        color: "emerald"
    },
    {
        id: "resultcall-offer",
        title: "Resultcall Offer Approval",
        description: "Fast-track your Resultcall offer approvals. We ensure your campaigns get the green light they need.",
        icon: <FileCheck className="h-10 w-10" />,
        color: "blue"
    },
    {
        id: "leadsmart-dashboard",
        title: "Leadsmart Dashboard Approval",
        description: "Obtain full access to the Leadsmart network. We handle the entire approval process for you.",
        icon: <BarChart className="h-10 w-10" />,
        color: "emerald"
    },
    {
        id: "leadsmart-offer",
        title: "Leadsmart Offer Approval",
        description: "Get top-tier Leadsmart offers approved. Bypass the typical waiting periods and start earning.",
        icon: <FileCheck className="h-10 w-10" />,
        color: "blue"
    }
];

export default function PPCPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        PPC Approvals & Access
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Fast-track your agency operations with verified dashboard access and offer approvals for top PPC networks.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                {/* PPC Services Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {ppcServices.map((service) => {
                        const whatsappNumber = "923414270742";
                        const whatsappMsg = encodeURIComponent(`Hi, I am interested in the ${service.title} service. Please provide details.`);
                        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

                        return (
                            <div key={service.id} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 flex flex-col md:flex-row gap-8 items-center hover:-translate-y-1 transition-transform duration-300">
                                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 ${service.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {service.icon}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-foreground/60 mb-6">{service.description}</p>
                                    <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                                        <div className="text-primary font-bold">
                                            Pricing on WhatsApp
                                        </div>
                                        <a 
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2"
                                        >
                                            <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
