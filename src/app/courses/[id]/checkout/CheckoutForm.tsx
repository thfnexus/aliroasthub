"use client";

import { useState } from "react";
import { Copy, CreditCard, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitPurchase } from "./actions"; // We will create this next
import Link from "next/link";
import Image from "next/image";

// Hardcoded for now, can be moved to DB or config later
const PAYMENT_METHODS = [
    {
        id: "easypaisa",
        name: "Easypaisa",
        title: "Easypaisa",
        number: "03414270742",
        accountName: "Kosar Parveen",
        color: "bg-green-500",
    },
    {
        id: "jazzcash",
        name: "Jazzcash",
        title: "Jazzcash",
        number: "03414270742",
        accountName: "Kosar Parveen",
        color: "bg-orange-500",
    },
    {
        id: "sadapay",
        name: "Sadapay",
        title: "Sadapay",
        number: "03414270742",
        accountName: "Kosar Parveen",
        color: "bg-blue-500",
    },
    {
        id: "binance",
        name: "Binance Pay",
        title: "Binance ID",
        number: "1079058149", // This is the ID
        accountName: "International Transfer",
        color: "bg-yellow-500",
    },
];

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
    const [trxId, setTrxId] = useState("");
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // We need to fetch course details. Since this is a client component, 
    // we typically pass them as props or fetch via API. 
    // For simplicity/speed in this architecture, we'll assume we know the price/title 
    // or fetch it. BUT, client components can't be async page props easily in App router 
    // mixed with usage.
    // STRATEGY: Make the wrapping page server-side, pass course data to a Client Form.
    // REFACTOR: This file accepts params. Let's assume we render a Client Component inside a Server Page.
    // For now, to keep it single-file for this step, I'll mock the course data display 
    // or (Better) I will make this a Client Component 'CheckoutForm' and the page.tsx a Server Component.

    // WAIT: User wants a checkout PAGE.
    // Let's stick to this being the client logic. 

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setScreenshot(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!trxId || !screenshot) {
            setError("Please provide both Transaction ID and Screenshot.");
            setIsSubmitting(false);
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append("courseId", params.id);
        formData.append("method", selectedMethod.name);
        formData.append("trxId", trxId);
        formData.append("screenshot", screenshot);

        try {
            // Call Server Action
            const result = await submitPurchase(formData);
            if (result.success) {
                setSuccess(true);
            } else {
                setError(result.error || "Submission failed.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-green-500/20">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Payment Submitted!</h2>
                    <p className="text-foreground/60 mb-8">
                        Your payment proof has been received. Our team will verify it within 1 to 2 hours and enroll you in the course.
                    </p>
                    <Link
                        href="/dashboard"
                        className="block w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Secure Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Payment Instructions */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary" /> Select Payment Method
                        </h2>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {PAYMENT_METHODS.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method)}
                                    className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-2 ${selectedMethod.id === method.id
                                        ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                                        : "border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <div className={`w-3 h-3 rounded-full ${method.color}`} />
                                    {method.name}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-xs text-foreground/50 font-bold uppercase mb-1">Send Payment To:</p>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-mono font-bold select-all">{selectedMethod.number}</span>
                                <button
                                    onClick={() => handleCopy(selectedMethod.number)}
                                    className="p-1.5 hover:bg-white rounded-lg transition-colors"
                                >
                                    <Copy className="h-4 w-4 text-foreground/40" />
                                </button>
                            </div>
                            <p className="text-sm font-medium text-foreground/70">{selectedMethod.accountName}</p>
                            <p className="text-xs text-primary mt-2 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> Please send exact amount
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Submission Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg h-fit">
                    <h2 className="text-xl font-bold mb-6">Submit Payment Proof</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" /> {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Transaction ID (TRX)</label>
                            <input
                                type="text"
                                value={trxId}
                                onChange={(e) => setTrxId(e.target.value)}
                                placeholder="e.g. 1234567890"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Screenshot <span className="text-xs text-foreground/50 font-normal">(Low size recommended, max 2MB)</span>
                            </label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    required
                                />
                                <Upload className="h-8 w-8 text-foreground/30 mx-auto mb-2" />
                                <p className="text-sm text-foreground/60">{screenshot ? screenshot.name : "Click to upload proof"}</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
                                </>
                            ) : (
                                "Verify Payment"
                            )}
                        </button>
                        <p className="text-xs text-center text-foreground/40 mt-4">
                            By submitting, you agree to our terms of service.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
