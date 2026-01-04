"use client";

import { useState } from "react";
import { User, Mail, Pen, Save, X, Loader2 } from "lucide-react";
import { updateUserName } from "./actions";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    user: {
        name: string | null;
        email: string | null;
        role: string;
    }
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setLoading(true);
        const result = await updateUserName(name);
        setLoading(false);

        if (result.success) {
            setIsEditing(false);
            router.refresh(); // Refresh to update server components like the Sidebar
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="glass rounded-[2rem] border-white/10 p-8 max-w-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold border-4 border-white dark:border-slate-900 shadow-xl">
                    {name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-1">{name || "Unknown User"}</h2>
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                        {user.role} Member
                    </span>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Email Section (Read-only) */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Mail className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-foreground/50 uppercase font-bold">Email Address</p>
                        <p className="font-medium text-sm">{user.email}</p>
                    </div>
                </div>

                {/* Name Edit Section */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-4 relative">
                    <div className="h-10 w-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                        <User className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-foreground/50 uppercase font-bold">Full Name</p>
                        {isEditing ? (
                            <input
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b border-primary focus:outline-none font-medium mt-1"
                            />
                        ) : (
                            <p className="font-medium">{name}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user.name || "");
                                    }}
                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-full transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 text-foreground/50 hover:text-primary rounded-full transition-all"
                            >
                                <Pen className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
