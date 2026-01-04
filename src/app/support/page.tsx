"use client";

import { useState } from "react";
import { Plus, Minus, Mail, Phone, Clock, HelpCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How long does payment approval take?",
        answer: "We strive for speed! Payment approval typically takes between 1 to 2 hours during business hours. Once approved, you'll get instant access to your course or service."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major local payment methods including Easypaisa, Jazzcash, Sadapay, and bank transfers. We also support cryptocurrency payments via Binance."
    },
    {
        question: "Is there a refund policy?",
        answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, simply contact us for a full refund. No questions asked."
    },
    {
        question: "How do I access my course after purchase?",
        answer: "Once your payment is approved (verified via TRX ID and screenshot), your account will be automatically enrolled. You can then access your content from your Dashboard."
    },
    {
        question: "Can I upgrade my hosting plan later?",
        answer: "Absolutely. You can upgrade your hosting plan at any time through your dashboard or by contacting support. We'll handle the migration seamlessly."
    }
];

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 overflow-x-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                        Help Center
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        How can we <span className="text-primary">help</span> you?
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-xl mx-auto">
                        Find answers to common questions or reach out to our support team directly. We're here 24/7.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* FAQs Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <HelpCircle className="text-primary h-6 w-6" />
                            Frequently Asked Questions
                        </h2>

                        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100 overflow-hidden shadow-xl shadow-black/5">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-foreground/5 last:border-0">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-bold text-lg pr-4">{faq.question}</span>
                                        <div className={`p-2 rounded-full ${openIndex === index ? 'bg-primary text-white' : 'bg-slate-100 text-foreground/50'} transition-all`}>
                                            {openIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 text-foreground/70 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Cards Sidebar */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <MessageCircle className="text-primary h-6 w-6" />
                            Contact Us
                        </h2>

                        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-100 shadow-xl shadow-black/5 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Email Support</h3>
                            <a href="mailto:help@aliroasthub.com" className="text-primary font-medium hover:underline block break-all">
                                help@aliroasthub.com
                            </a>
                            <p className="text-xs text-foreground/50 mt-2">Avg. response: 1-2 hours</p>
                        </div>

                        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-100 shadow-xl shadow-black/5 hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Phone / WhatsApp</h3>
                            <a href="tel:+923414270742" className="text-purple-500 font-medium hover:underline block">
                                +92 341 4270742
                            </a>
                            <p className="text-xs text-foreground/50 mt-2">Mon-Fri, 9am - 6pm PKT</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                            <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                            <h4 className="font-bold text-green-700">Response Time</h4>
                            <p className="text-sm text-green-800/70 mt-1">
                                We verify payments within <br /><b>1 to 2 hours</b>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
