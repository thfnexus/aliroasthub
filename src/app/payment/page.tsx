import { CreditCard, Landmark, Smartphone, Info, AlertTriangle } from "lucide-react";

const paymentMethods = [
    {
        name: "Bank Transfer",
        details: [
            { label: "Bank Name", value: "Standard Chartered Bank" },
            { label: "Account Name", value: "Ali Roast Hub" },
            { label: "Account Number", value: "01-1234567-89" },
            { label: "Branch Code", value: "001" },
        ],
        icon: <Landmark className="h-6 w-6 text-primary" />,
    },
    {
        name: "JazzCash",
        details: [
            { label: "Account Title", value: "Ali Roast Hub" },
            { label: "JazzCash Number", value: "0300-1234567" },
        ],
        icon: <Smartphone className="h-6 w-6 text-secondary" />,
    },
    {
        name: "EasyPaisa",
        details: [
            { label: "Account Title", value: "Ali Roast Hub" },
            { label: "EasyPaisa Number", value: "0345-1234567" },
        ],
        icon: <Smartphone className="h-6 w-6 text-accent" />,
    },
];

export default function PaymentPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Payment Information</h1>
                <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                    Choose your preferred method to complete your purchase.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {paymentMethods.map((method, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                                {method.icon}
                            </div>
                            <h2 className="text-2xl font-bold">{method.name}</h2>
                        </div>
                        <div className="space-y-4">
                            {method.details.map((detail, j) => (
                                <div key={j} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                                    <span className="text-foreground/50 text-sm font-medium">{detail.label}</span>
                                    <span className="text-foreground font-bold">{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Instructions Card */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Info className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Verification Instruction</h2>
                    <p className="text-white/70 leading-relaxed mb-4">
                        After making the payment via any of the above methods, please send your <span className="font-bold text-white">Transaction ID & Screenshot</span> to our admin team for verification.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Access will be granted within 24 hours.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
