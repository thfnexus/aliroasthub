"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Users, CreditCard, CheckCircle, Search, PlusCircle, Loader2, BookOpen, AlertTriangle, Trash2, Shield, ShieldOff, ChevronDown, ChevronUp } from "lucide-react";
import { getUsers, getCourses, assignCourse, deleteUser, updateUserRole, getPendingPurchases, approvePurchase, rejectPurchase } from "./actions";

export default function AdminPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [purchases, setPurchases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null); // Track ID being processed
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("Overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    async function fetchData() {
        try {
            const [usersData, coursesData, purchasesData] = await Promise.all([getUsers(), getCourses(), getPendingPurchases()]);
            setUsers(usersData);
            setCourses(coursesData);
            setPurchases(purchasesData);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAssignCourse = async (userId: string, courseId: string) => {
        if (!courseId) return;
        setProcessing(userId);
        const result = await assignCourse(userId, courseId);
        if (result.success) {
            await fetchData(); // Refresh data
            alert("Course assigned successfully!");
        } else {
            alert(result.error);
        }
        setProcessing(null);
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        setProcessing(userId);
        const result = await deleteUser(userId);
        if (result.success) {
            await fetchData();
        } else {
            alert(result.error);
        }
        setProcessing(null);
    };

    const handleToggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
        setProcessing(userId);
        const result = await updateUserRole(userId, newRole);
        if (result.success) {
            await fetchData();
        } else {
            alert(result.error);
        }
        setProcessing(null);
    };

    const handleApprovePurchase = async (purchaseId: string) => {
        if (!confirm("Are you sure you want to approve this purchase? This will enroll the user.")) return;
        setProcessing(purchaseId);
        const result = await approvePurchase(purchaseId);
        if (result.success) {
            await fetchData();
            alert("Purchase approved and user enrolled!");
        } else {
            alert(result.error);
        }
        setProcessing(null);
    };

    const handleRejectPurchase = async (purchaseId: string) => {
        if (!confirm("Are you sure you want to REJECT this purchase?")) return;
        setProcessing(purchaseId);
        const result = await rejectPurchase(purchaseId);
        if (result.success) {
            await fetchData();
            alert("Purchase rejected.");
        } else {
            alert(result.error);
        }
        setProcessing(null);
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col glass border-r border-white/10 sticky top-16 h-[calc(100vh-4rem)]">
                <div className="p-6 space-y-2">
                    {[
                        { name: "Overview", icon: <LayoutDashboard /> },
                        { name: "User Management", icon: <Users /> },
                        { name: "Payments", icon: <CreditCard /> },
                    ].map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.name ? "bg-primary text-white" : "text-foreground/60 hover:bg-white/5"}`}
                        >
                            <span className="h-5 w-5">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 w-full">
                <header className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">Admin Console</h1>
                            <p className="text-foreground/60 text-sm lg:text-base">Manage Users, Payments & Course Allocations</p>
                        </div>
                    </div>

                    {/* Mobile Tab Dropdown */}
                    <div className="lg:hidden relative">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-white/10 rounded-xl"
                        >
                            <span className="flex items-center gap-2 font-medium">
                                {activeTab === "Overview" && <LayoutDashboard className="h-5 w-5" />}
                                {activeTab === "User Management" && <Users className="h-5 w-5" />}
                                {activeTab === "Payments" && <CreditCard className="h-5 w-5" />}
                                {activeTab}
                            </span>
                            {isMobileMenuOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>

                        {isMobileMenuOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2">
                                {[
                                    { name: "Overview", icon: <LayoutDashboard /> },
                                    { name: "User Management", icon: <Users /> },
                                    { name: "Payments", icon: <CreditCard /> },
                                ].map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            setActiveTab(item.name);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === item.name ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                                    >
                                        <span className="h-5 w-5">{item.icon}</span>
                                        <span className="font-medium">{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                {activeTab === "Overview" && (
                    <div className="space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="glass p-6 rounded-2xl border-white/10">
                                <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Total Users</p>
                                <p className="text-3xl font-black text-primary">{users.length}</p>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/10">
                                <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Active Courses</p>
                                <p className="text-3xl font-black text-secondary">{courses.filter(c => c.category === 'COURSE').length}</p>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/10">
                                <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Services & Plans</p>
                                <p className="text-3xl font-black text-purple-500">{courses.filter(c => c.category !== 'COURSE').length}</p>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/10">
                                <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-2">Pending Payments</p>
                                <p className="text-3xl font-black text-yellow-500">{purchases.length}</p>
                            </div>
                        </div>

                        {/* User Management Table */}
                        <div className="glass rounded-[2rem] border-white/10 overflow-hidden bg-white dark:bg-slate-900/50">
                            <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Users className="text-primary h-6 w-6" /> User Database
                                </h2>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                                    <input
                                        placeholder="Search by name/email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs text-foreground/50 uppercase tracking-wider font-bold text-left">
                                        <tr>
                                            <th className="px-8 py-4">User Details</th>
                                            <th className="px-8 py-4">Current Enrollments</th>
                                            <th className="px-8 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                            {user.name?.[0] || "U"}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-foreground">{user.name || "Unknown User"}</p>
                                                            <p className="text-xs text-foreground/50">{user.email}</p>
                                                            <button
                                                                onClick={() => handleToggleRole(user.id, user.role)}
                                                                className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:underline ${user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}
                                                                title="Click to toggle role"
                                                            >
                                                                {user.role}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <div className="space-y-1">
                                                        {user.enrollments && user.enrollments.length > 0 ? (
                                                            user.enrollments.map((e: any) => (
                                                                <div key={e.id} className="flex items-center gap-2 text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded w-fit">
                                                                    <BookOpen className="h-3 w-3" />
                                                                    {e.course.title}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-slate-400 italic">No Active Courses</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {/* Assign Course */}
                                                        <div className="relative group-hover:block transition-all">
                                                            <select
                                                                className="appearance-none w-40 text-xs p-2.5 pr-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary cursor-pointer"
                                                                id={`assign-${user.id}`}
                                                            >
                                                                <option value="">+ Assign Course</option>
                                                                {courses.map(c => (
                                                                    <option key={c.id} value={c.id}>{c.title}</option>
                                                                ))}
                                                            </select>
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <svg className="w-3 h-3 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const select = document.getElementById(`assign-${user.id}`) as HTMLSelectElement;
                                                                if (select.value) handleAssignCourse(user.id, select.value);
                                                            }}
                                                            disabled={processing === user.id}
                                                            className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-primary/20"
                                                            title="Assign Course"
                                                        >
                                                            <PlusCircle className="h-4 w-4" />
                                                        </button>

                                                        {/* Toggle Role */}
                                                        <button
                                                            onClick={() => handleToggleRole(user.id, user.role)}
                                                            disabled={processing === user.id}
                                                            className="p-2.5 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-all active:scale-95 disabled:opacity-50"
                                                            title={user.role === 'ADMIN' ? "Demote to User" : "Promote to Admin"}
                                                        >
                                                            {user.role === 'ADMIN' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                                        </button>

                                                        {/* Delete User */}
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            disabled={processing === user.id}
                                                            className="p-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all active:scale-95 disabled:opacity-50"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Payments" && (
                    <div className="space-y-8">
                        <div className="glass rounded-[2rem] border-white/10 overflow-hidden bg-white dark:bg-slate-900/50">
                            <div className="p-8 border-b border-white/10">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <CreditCard className="text-primary h-6 w-6" /> Pending Payment Approvals
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs text-foreground/50 uppercase tracking-wider font-bold text-left">
                                        <tr>
                                            <th className="px-8 py-4">User</th>
                                            <th className="px-8 py-4">Course/Service</th>
                                            <th className="px-8 py-4">Transaction Details</th>
                                            <th className="px-8 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {purchases.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-12 text-center text-foreground/50">
                                                    No pending payments found.
                                                </td>
                                            </tr>
                                        ) : (
                                            purchases.map((purchase) => (
                                                <tr key={purchase.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-4">
                                                        <div>
                                                            <p className="font-bold text-sm text-foreground">{purchase.user?.name || "Unknown"}</p>
                                                            <p className="text-xs text-foreground/50">{purchase.user?.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <div>
                                                            <p className="font-bold text-sm">{purchase.course?.title}</p>
                                                            <p className="text-xs text-primary font-bold">PKR {purchase.amount.toLocaleString()}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded w-fit">TRX: {purchase.trxId}</p>
                                                            <p className="text-xs text-foreground/50">Via {purchase.method}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleApprovePurchase(purchase.id)}
                                                                disabled={processing === purchase.id}
                                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg shadow-green-500/20 disabled:opacity-50"
                                                            >
                                                                {processing === purchase.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                                                                Approve
                                                            </button>

                                                            <button
                                                                onClick={() => handleRejectPurchase(purchase.id)}
                                                                disabled={processing === purchase.id}
                                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
                                                            >
                                                                {processing === purchase.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <AlertTriangle className="h-4 w-4" />}
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
