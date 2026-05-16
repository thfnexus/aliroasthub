"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Rocket, LogOut, ChevronDown, ChevronUp, User, LayoutDashboard, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-1 flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="https://i.ibb.co/LDsMnF6S/crazy-boy-removebg-preview.png"
                                alt="Ali Roast Hub"
                                className="h-10 w-auto"
                            />
                            <span className="text-xl font-bold gradient-text">Ali Roast Hub</span>
                        </Link>
                    </div>

                    {/* Desktop Menu - Centered Links */}
                    <div className="hidden md:flex items-center justify-center space-x-8">
                        <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Home</Link>
                        <Link href="/courses" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Courses</Link>
                        <Link href="/services" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Services</Link>
                        <Link href="/ppc" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">PPC Approvals</Link>
                        <Link href="/domain-hosting" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Hosting & Domain</Link>
                        <Link href="/support" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Support</Link>

                        {session && (
                            <Link href="/dashboard" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Dashboard</Link>
                        )}
                    </div>

                    {/* Desktop Menu - Right Action Buttons */}
                    <div className="flex-1 hidden md:flex items-center justify-end space-x-6">
                        {session ? (
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Login</Link>
                                <Link href="/signup" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 text-sm font-medium transition-colors">Signup</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 cursor-pointer"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/10 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/services"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                        >
                            Services
                        </Link>
                        <Link
                            href="/ppc"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                        >
                            PPC Approvals
                        </Link>
                        <Link
                            href="/domain-hosting"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                        >
                            Hosting & Domain
                        </Link>
                        <Link
                            href="/support"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                        >
                            Support
                        </Link>


                        {session ? (
                            <>
                                {/* Dashboard Dropdown */}
                                <div>
                                    <button
                                        onClick={() => setIsDashboardMenuOpen(!isDashboardMenuOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                                    >
                                        <span className="flex items-center gap-2">
                                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                                        </span>
                                        {isDashboardMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>

                                    {isDashboardMenuOpen && (
                                        <div className="pl-6 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsOpen(false)}
                                                className="block px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-primary hover:bg-primary/5"
                                            >
                                                Overview
                                            </Link>
                                            <Link
                                                href="/dashboard/profile"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-primary hover:bg-primary/5"
                                            >
                                                <User className="h-3 w-3" /> Profile
                                            </Link>

                                            {(session?.user as any)?.role === "ADMIN" && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-purple-500 hover:text-purple-600 hover:bg-purple-500/10"
                                                >
                                                    <Shield className="h-3 w-3" /> Admin Panel
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-500/10 cursor-pointer"
                                >
                                    <LogOut className="h-4 w-4" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white text-center hover:bg-primary/90"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
