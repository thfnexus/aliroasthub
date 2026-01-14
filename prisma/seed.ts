import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const courses = [
    {
      title: "Pay Per Call Mastery Program",
      description: "Master the art of Pay Per Call marketing. Learn how to generate high-quality leads and scale your revenue.",
      price: 20000,
      duration: "38 hours",
      students: 7245,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
      content: `
# Course Overview
The Pay Per Call Mastery Program is a practical, result-focused course designed to teach you how to generate high-quality inbound calls and earn through performance-based marketing. This course is built for beginners as well as marketers who want to scale real campaigns.

You will learn the complete Pay Per Call ecosystem — from understanding offers to tracking calls and optimizing payouts.

# What You’ll Learn
- How Pay Per Call marketing works in real business models
- Selecting profitable offers and niches
- Understanding call tracking and lead quality
- MarketCall dashboard overview
- Compliance and quality control
- Scaling campaigns step-by-step

# Who This Course Is For
- Beginners entering digital marketing
- Affiliate marketers
- Freelancers & online earners
- Anyone looking for performance-based income

# Syllabus
- Module 1: Understanding the Pay Per Call Ecosystem
  Introduction to performance marketing, how calls are tracked, and the difference between CPA and Pay Per Call.
- Module 2: Niche Selection & Offer Research
  How to find high-converting niches (Insurance, Home Services, etc.) and selecting the best affiliate networks.
- Module 3: Traffic Sources Deep Dive
  Mastering Google Ads, Bing Ads, and Facebook Ads for call generation.
- Module 4: Setting Up Call Tracking (Ringba/Retreaver)
  Step-by-step guide to setting up your tracking numbers and IVRs.
- Module 5: Campaign Launch & Optimization
  Live campaign setup, keyword research, and bidding strategies.
- Module 6: Scaling & Fraud Prevention
  How to scale to $1k/day and protect your campaigns from bot traffic.

# Course Features
- Practical learning (real-world focused)
- Easy-to-understand lessons
- Step-by-step guidance
- Lifetime Access
- Access granted after manual approval

# Instructor
**Ali Roast Hub Team**
Industry-focused trainers with hands-on experience in Pay Per Call and performance marketing.
            `
    },
    {
      title: "SEO & Ranking Masterclass",
      description: "Dominate search results in 2026. This comprehensive course covers technical SEO, link building, and content strategy.",
      price: 30000,
      duration: "45 hours",
      students: 4892,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1000&auto=format&fit=crop",
      content: `
# Course Overview
The SEO & Ranking Masterclass is a complete guide to ranking websites on search engines using ethical and long-term strategies. This course focuses on practical SEO skills that can be applied to personal projects, client websites, and business growth.

No theory overload — only what actually works.

# What You’ll Learn
- SEO fundamentals & search engine basics
- Keyword research and content planning
- On-page SEO optimization
- Technical SEO essentials
- Off-page SEO & link building
- Website audits and performance improvement

# Who This Course Is For
- Beginners in SEO
- Freelancers & digital marketers
- Business owners
- Bloggers & niche website builders

# Syllabus
- Module 1: SEO Fundamentals
  How search engines work, crawling, indexing, and ranking factors in 2026.
- Module 2: Advanced Keyword Research
  Finding low-competition, high-volume keywords using modern tools.
- Module 3: On-Page Optimization
  Perfecting title tags, meta descriptions, headers, and content structure.
- Module 4: Technical SEO Mastery
  Site speed, mobile optimization, schema markup, and fixing crawl errors.
- Module 5: Authority Building (Backlinks)
  White-hat link building strategies, guest posting, and outreach.
- Module 6: Local SEO & GMB
  Ranking local businesses on Google Maps.

# Course Features
- Beginner-friendly structure
- Real examples & use cases
- Action-based lessons
- Lifetime Access
- Manual access approval

# Instructor
**Ali Roast Hub SEO Experts**
Professionals experienced in ranking and optimization strategies.
            `
    },
    {
      title: "Practical Web Development for Business",
      description: "Build robust, high-converting websites. Covers Modern React, Next.js, and backend integration.",
      price: 15000,
      duration: "42 hours",
      students: 6521,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
      content: `
# Course Overview
Practical Web Development for Business teaches you how to build modern, fast, and conversion-focused websites. This course is designed for people who want to create websites for real businesses — not just practice projects.

Focus is on usability, layout, and performance.

# What You’ll Learn
- Modern website structure
- Responsive layouts
- Business-focused UI design
- Performance & speed basics
- Deployment fundamentals
- Best practices for client websites

# Who This Course Is For
- Beginners in web development
- Freelancers
- Startup founders
- Anyone who wants to build business websites

# Syllabus
- Module 1: Modern Web Foundations
  Review of semantic HTML5, modern CSS3 (Flexbox/Grid), and ES6+ JavaScript.
- Module 2: React.js Essentials
  Components, props, state management, and hooks (useState, useEffect).
- Module 3: Next.js Architecture
  App router, server components vs client components, and routing.
- Module 4: UI Design & Tailwind CSS
  Building beautiful, responsive layouts rapidly.
- Module 5: Backend & Database Integration
  Connecting to databases (PostgreSQL/Prisma), API routes, and authentication.
- Module 6: Deployment & Client Handover
  Deploying to Vercel, domain setup, and basic SEO for web apps.

# Course Features
- Practical & project-oriented
- Clean, modern approach
- Business mindset training
- Lifetime Access
- Access provided after verification

# Instructor
**Ali Roast Hub Development Team**
Experienced developers focused on real-world implementation.
            `
    },
  ];

  const services = [
    {
      title: "MarketCall Dashboard Access",
      description: "Get elite access to the MarketCall dashboard for advanced campaign analytics and real-time tracking.",
      price: 10000,
      duration: "Lifetime",
      students: 154,
      rating: 5.0,
      category: "SERVICE",
      imageUrl: "bg-gradient-to-br from-blue-600 to-indigo-700",
      content: `
# Service Overview
Access the premium MarketCall dashboard to manage and scale your campaigns effectively.

# Features
- Real-time call tracking
- Advanced analytics
- Campaign management tools
            `
    },
    {
      title: "Offer Approval System",
      description: "Streamline your offer approvals with enterprise-level security and speed.",
      price: 4500,
      duration: "Lifetime",
      students: 89,
      rating: 4.8,
      category: "SERVICE",
      imageUrl: "bg-gradient-to-br from-emerald-500 to-teal-700",
      content: `
# Service Overview
Our proprietary system designed to get your offers approved faster.

# Features
- Quick approval workflow
- Compliance checking
- Secure data handling
            `
    },
    {
      title: "Web Development",
      description: "Custom high-performance websites and web applications tailored to your business needs. E-commerce, Portfolios, and Enterprise solutions.",
      price: 0,
      duration: "Custom",
      students: 0,
      rating: 5.0,
      category: "SERVICE",
      imageUrl: "blue",
      content: `
# Service Overview
Professional web development services for modern businesses.

# Features
- Custom websites and web applications
- E-commerce solutions
- Portfolio sites
- Enterprise solutions
            `
    },
    {
      title: "Google Ads",
      description: "Scale your business with highly optimized Google Search, Display, and Video ads. Maximize your ROI with data-driven campaigns.",
      price: 0,
      duration: "Custom",
      students: 0,
      rating: 5.0,
      category: "SERVICE",
      imageUrl: "emerald",
      content: `
# Service Overview
Professional Google Ads campaign management and optimization.

# Features
- Google Search Ads
- Display Ads
- Video Ads
- Data-driven optimization
            `
    },
    {
      title: "Meta Ads",
      description: "High-converting Facebook and Instagram ad campaigns. We handle everything from creative strategy to audience targeting and scaling.",
      price: 0,
      duration: "Custom",
      students: 0,
      rating: 5.0,
      category: "SERVICE",
      imageUrl: "blue",
      content: `
# Service Overview
Expert Meta (Facebook & Instagram) advertising services.

# Features
- Facebook Ads
- Instagram Ads
- Creative strategy
- Audience targeting and scaling
            `
    },
    {
      title: "Hosting - PLUS Plan",
      description: "For those need of running multiple sites.",
      price: 4440,
      duration: "Yearly",
      students: 312,
      rating: 4.9,
      category: "HOSTING",
      imageUrl: "bg-gradient-to-br from-slate-700 to-slate-900",
      content: `
# Top Features
- 5 Website
- 10 GB NVMe Storage
- 50 Email Accounts
- 100 MySQL Databases
- 24/7 Customer Support

# Also includes
- Free Domain 1 Year
- Free CDN Included
- Free SSL Certificate
- Free Domain Privacy
- Free Malware Protection
            `
    },
    {
      title: "Hosting - DELUXE Plan",
      description: "Best performance with add-on options",
      price: 5320,
      duration: "Yearly",
      students: 541,
      rating: 5.0,
      category: "HOSTING",
      imageUrl: "bg-gradient-to-br from-purple-600 to-indigo-900",
      content: `
# Top Features
- 100 Website
- 100 GB NVMe Storage
- 100 Email Accounts
- 500 MySQL Databases
- 24/7 Customer Support

# Also includes
- Free Domain 1 Year
- Free CDN Included
- Free SSL Certificate
- Free Domain Privacy
- Free Malware Protection
            `
    },
    {
      title: "Hosting - ULTIMATE Plan",
      description: "Unlimited sites with automatic backup.",
      price: 6280,
      duration: "Yearly",
      students: 128,
      rating: 5.0,
      category: "HOSTING",
      imageUrl: "bg-gradient-to-br from-orange-500 to-red-700",
      content: `
# Top Features
- Unlimited Website
- Unlimited NVMe Storage
- Unlimited Email Accounts
- 500 MySQL Databases
- 24/7 Customer Support

# Also includes
- Free Domain 1 Year
- Free CDN Included
- Free SSL Certificate
- Free Domain Privacy
- Free Daily Backup
- Free Malware Protection
            `
    }
  ];

  // Combine all
  const allItems = [...courses.map(c => ({ ...c, category: "COURSE" })), ...services];

  console.log("Seeding database...");

  // STRICT CLEANUP: Delete any course/service that is NOT in our defined list
  const allowedTitles = allItems.map(c => c.title);
  await prisma.course.deleteMany({
    where: {
      title: {
        notIn: allowedTitles
      }
    }
  });

  for (const item of allItems) {
    // We use title as unique identifier for seeding
    const existing = await prisma.course.findFirst({
      where: { title: item.title }
    });

    if (existing) {
      await prisma.course.update({
        where: { id: existing.id },
        data: item,
      });
      console.log(`Updated ${item.title}`);
    } else {
      await prisma.course.create({
        data: item,
      });
      console.log(`Created ${item.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
