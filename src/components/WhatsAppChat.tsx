"use client";

import { useState } from "react";
import { MessageCircle, Send, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_INFO, getWhatsAppLink } from "@/lib/constants";

export default function WhatsAppChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        const link = getWhatsAppLink(message);
        window.open(link, "_blank");
        setMessage("");
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <MessageCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Ali Roast Hub</h3>
                                    <p className="text-[10px] opacity-80">Typically replies in 1-2 hours</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 bg-slate-50 min-h-[100px] flex flex-col justify-end">
                            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm text-sm text-slate-700 max-w-[85%] mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                Hi there! 👋 How can we help you today?
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                            <button
                                type="submit"
                                className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-800 text-white' : 'bg-emerald-500 text-white'}`}
            >
                {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                )}
            </motion.button>
        </div>
    );
}
