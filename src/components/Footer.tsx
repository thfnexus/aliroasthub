import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-xl font-bold gradient-text mb-4">Ali Roast Hub</h2>
                        <p className="text-foreground/60 max-w-xs">
                            Empowering your digital journey with premium courses and top-tier services. Your success starts here.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-foreground/60 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/courses" className="text-foreground/60 hover:text-primary transition-colors">Courses</Link></li>
                            <li><Link href="/services" className="text-foreground/60 hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/domain-hosting" className="text-foreground/60 hover:text-primary transition-colors">Hosting & Domain</Link></li>
                            <li><Link href="/support" className="text-foreground/60 hover:text-primary transition-colors">Support</Link></li>

                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Auth</h3>
                        <ul className="space-y-2">
                            <li><Link href="/login" className="text-foreground/60 hover:text-primary transition-colors">Login</Link></li>
                            <li><Link href="/signup" className="text-foreground/60 hover:text-primary transition-colors">Signup</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" className="text-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-foreground/60 hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/refund-policy" className="text-foreground/60 hover:text-primary transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-foreground/50">
                        © {currentYear} Ali Roast Hub. All rights reserved.
                    </p>
                    <p className="text-sm font-medium text-foreground/70">
                        Developed by <Link href="https://thfnexus.com" target="_blank" className="text-primary hover:underline">THF NEXUS</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
