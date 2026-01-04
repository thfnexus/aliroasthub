"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2, Globe, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setSent(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Submission error", error);
            alert("Failed to send message.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 overflow-x-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-20 right-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[128px] opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                        24/7 Support
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Let's Start a <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Conversation</span>
                    </h1>
                    <p className="text-lg text-foreground/60 leading-relaxed">
                        Have a project in mind or need help with our services? We're ready to help you scale your digital presence to the next level.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

                    {/* Contact Info Cards - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-4 flex flex-col justify-center">
                        <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-slate-100 hover:border-primary/30 transition-all hover:-translate-y-1 duration-300 md:h-full flex flex-col justify-center">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-1">Email Us</h3>
                            <p className="text-foreground/60 mb-2 text-sm">Our friendly team is here to help.</p>
                            <a href="mailto:help@aliroasthub.com" className="font-semibold text-primary hover:underline">help@aliroasthub.com</a>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-slate-100 hover:border-purple-500/30 transition-all hover:-translate-y-1 duration-300 md:h-full flex flex-col justify-center">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-1">Call Us</h3>
                            <p className="text-foreground/60 mb-2 text-sm">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+923414270742" className="font-semibold text-purple-500 hover:underline">+92 341 4270742</a>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-slate-100 hover:border-green-500/30 transition-all hover:-translate-y-1 duration-300 md:h-full flex flex-col justify-center">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/20">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-1">Visit Us</h3>
                            <p className="text-foreground/60 mb-2 text-sm">Come say hello at our office HQ.</p>
                            <span className="font-semibold text-green-600">Lahore, Pakistan</span>
                        </div>
                    </div>

                    {/* Form Side - Takes 3 columns */}
                    <div className="lg:col-span-3">
                        <div className="h-full bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-2xl shadow-black/5 relative overflow-hidden">

                            {/* Decorative gradient inside form */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                            {sent ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30">
                                        <Send className="h-10 w-10 text-white" />
                                    </div>
                                    <h2 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-700">Message Sent!</h2>
                                    <p className="text-foreground/60 mb-10 text-lg max-w-sm mx-auto">Thank you for dropping a line. We'll get back to you faster than light speed.</p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="px-8 py-3 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-colors border border-slate-200"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MessageSquare className="text-primary h-6 w-6" />
                                        <h2 className="text-2xl font-bold">Send us a Message</h2>
                                    </div>

                                    <input type="hidden" name="access_key" value="98de4472-be81-477d-be22-ab115ad4604d" />
                                    <input type="hidden" name="subject" value="New Contact Form Submission - Ali Roast Hub" />
                                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-foreground/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-foreground/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-foreground/50 ml-1">Your Message</label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            required
                                            rows={6}
                                            placeholder="Tell us about your project or inquiry..."
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none placeholder:text-foreground/30"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.01] transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-4"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
