import Link from "next/link";
import { ArrowRight, CheckCircle, Rocket, Shield, Zap, Globe, Cpu, BookOpen, Clock, Users, Star, ShoppingCart, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const recentCourses = await prisma.course.findMany({
    where: { category: 'COURSE' },
    take: 3,
    orderBy: { students: 'desc' }
  });

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Launching the Future of EdTech 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Master the Digital Age with <span className="gradient-text">Ali Roast Hub</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium education and enterprise-grade services tailored for the next generation of digital entrepreneurs and businesses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/courses" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/25">
              Explore Courses <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="w-full sm:w-auto px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/20">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">World-Class Services</h2>
          <p className="text-foreground/60">Professional tools and infrastructure for your business.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "MarketCall Dashboard", icon: <Cpu />, desc: "Advanced analytics and campaign management access." },
            { title: "Offer Approval System", icon: <Shield />, desc: "Streamlined system for quick and secure offer management." },
            { title: "Premium Hosting", icon: <Globe />, desc: "High-speed, elite hosting & domain plans for businesses." },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-all border border-slate-200 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:rotate-6 transition-transform relative z-10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
              <p className="text-foreground/60 mb-6 relative z-10 leading-relaxed">{item.desc}</p>
              <Link href="/services" className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">
                View Plans <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Preview */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">In-Demand Courses</h2>
              <p className="text-foreground/60">Expert-led masterclasses to scale your skills.</p>
            </div>
            <Link href="/courses" className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
              View all courses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentCourses.map((course) => (
              <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                {/* Image Area */}
                <div className={`h-48 relative ${!course.imageUrl?.startsWith('http') ? (course.imageUrl || 'bg-slate-100') : 'bg-slate-50'}`}>
                  {course.imageUrl?.startsWith('http') ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <BookOpen className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg font-bold text-xs text-emerald-600 border border-emerald-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    WhatsApp for Pricing
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-foreground/60 text-sm mb-4 line-clamp-2 flex-grow">
                    {course.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-foreground/50 mb-6 font-medium">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students?.toLocaleString()} Students</span>
                    <span className="flex items-center gap-1 text-yellow-500"><Star className="h-3.5 w-3.5 fill-current" /> {course.rating}</span>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <a 
                      href={`https://wa.me/923414270742?text=${encodeURIComponent(`Hi, I am interested in the ${course.title} course featured on your home page. Please provide details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-emerald-500 text-white text-center rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
                    </a>
                    <Link href={`/courses/${course.id}`} className="w-full py-3 bg-slate-100 text-foreground text-center rounded-xl font-bold hover:bg-slate-200 transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-foreground/60">Start your journey in four simple steps.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Choose Goal", desc: "Select the course or service that fits your needs." },
            { step: "02", title: "Secure Payment", desc: "Use our easy payment methods for instant confirmation." },
            { step: "03", title: "Wait for Admin", desc: "Our team will verify your payment within 1 to 2 hours." },
            { step: "04", title: "Get Access", desc: "Gain lifetime access to your premium dashboard." },
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl font-black text-primary/5 absolute -top-10 left-0 transition-colors group-hover:text-primary/10">
                {item.step}
              </div>
              <div className="relative pt-4">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-12 md:p-16 rounded-[2rem] text-center border-primary/20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Scale Your Future?</h2>
          <p className="text-xl text-foreground/70 mb-10 max-w-xl mx-auto">
            Join thousands of successful students and entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Get Started Now
            </Link>
            <Link href="/courses" className="px-8 py-4 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
