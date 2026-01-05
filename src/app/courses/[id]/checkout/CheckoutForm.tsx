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

export default function CheckoutPage({
    params,
    courseCategory,
    courseTitle
}: {
    params: { id: string },
    courseCategory: string,
    courseTitle: string
}) {
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
    const [trxId, setTrxId] = useState("");
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const WHATSAPP_NUMBER = "+923414270742";

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

        const formData = new FormData();
        formData.append("courseId", params.id);
        formData.append("method", selectedMethod.name);
        formData.append("trxId", trxId);
        formData.append("screenshot", screenshot);

        try {
            const result = await submitPurchase(formData);
            if (result.success) {
                setSuccess(true);

                // Automatic WhatsApp redirect for ALL items after a short delay
                const message = encodeURIComponent(`Hi, I just submitted the payment proof for ${courseTitle}.\n\nTRX ID: ${trxId}\nPayment Method: ${selectedMethod.name}`);
                const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\s+/g, '')}?text=${message}`;

                setTimeout(() => {
                    window.open(waLink, "_blank");
                }, 2000);
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
                        Your payment proof has been received. Please contact us on WhatsApp to finalize your activation.
                    </p>

                    <div className="space-y-3">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s+/g, '')}?text=${encodeURIComponent(`Hi, I just submitted the payment proof for ${courseTitle}.\n\nTRX ID: ${trxId}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Contact on WhatsApp
                        </a>
                        <Link
                            href="/dashboard"
                            className="block w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
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
