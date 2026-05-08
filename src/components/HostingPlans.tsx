'use client';

import { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface HostingPlan {
    id: string;
    title: string;
    description: string;
    content: string | null;
    price: number;
}

interface HostingPlansProps {
    plans: HostingPlan[];
}

export default function HostingPlans({ plans }: HostingPlansProps) {
    // Find the Deluxe plan to set as default, or fallback to the middle one/first one
    const defaultPlan = plans.find(p => p.title.includes('DELUXE')) || plans[1] || plans[0];
    const [selectedPlanId, setSelectedPlanId] = useState<string>(defaultPlan?.id);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;

                return (
                    <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`relative bg-white rounded-3xl p-8 border cursor-pointer transition-all duration-300 flex flex-col ${isSelected
                            ? 'border-primary shadow-2xl scale-105 z-10 ring-4 ring-primary/10'
                            : 'border-slate-200 shadow-lg hover:border-primary/50 hover:shadow-xl'
                            }`}
                    >
                        {isSelected && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 ${isSelected ? 'text-primary' : 'text-foreground/70'}`}>
                                {plan.title.replace('Hosting - ', '')}
                            </h3>
                            <div className="text-2xl font-black text-emerald-600 mb-2">
                                Pricing on WhatsApp
                            </div>
                            <div className="text-xs text-foreground/50 uppercase tracking-widest font-bold">Contact for Yearly Plan</div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4 mb-8 flex-grow">
                            {plan.content?.split('\n').map((line, idx) => {
                                const trim = line.trim();
                                if (trim.startsWith('-')) {
                                    return (
                                        <div key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                                            <Check className={`h-5 w-5 shrink-0 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                                            <span>{trim.replace('- ', '')}</span>
                                        </div>
                                    );
                                }
                                if (trim.startsWith('#')) {
                                    return <div key={idx} className="font-bold text-sm uppercase text-foreground/40 mt-6 mb-2">{trim.replace(/#/g, '')}</div>
                                }
                                return null;
                            })}
                        </div>

                        <a
                            href={`https://wa.me/923414270742?text=${encodeURIComponent(`Hi, I am interested in the ${plan.title} hosting plan. Please provide pricing and activation details.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-4 rounded-xl font-bold text-center transition-all ${isSelected
                                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25'
                                : 'bg-slate-100 text-foreground hover:bg-slate-200'
                                }`}
                            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking button
                        >
                            Contact Support
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
