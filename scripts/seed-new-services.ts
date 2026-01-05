import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const services = [
        {
            title: "Web Development",
            description: "Custom high-performance websites and web applications tailored to your business needs. E-commerce, Portfolios, and Enterprise solutions.",
            category: "SERVICE",
            price: 0,
            imageUrl: "blue" // Using color names as placeholders for icon logic
        },
        {
            title: "Google Ads",
            description: "Scale your business with highly optimized Google Search, Display, and Video ads. Maximize your ROI with data-driven campaigns.",
            category: "SERVICE",
            price: 0,
            imageUrl: "emerald"
        },
        {
            title: "Meta Ads",
            description: "High-converting Facebook and Instagram ad campaigns. We handle everything from creative strategy to audience targeting and scaling.",
            category: "SERVICE",
            price: 0,
            imageUrl: "blue"
        }
    ];

    console.log("Seeding new services...");

    for (const service of services) {
        try {
            console.log(`Checking service: ${service.title}`);
            const existing = await prisma.course.findFirst({
                where: { title: service.title }
            });

            if (existing) {
                console.log(`Service "${service.title}" already exists. Skipping.`);
                continue;
            }

            const created = await prisma.course.create({
                data: service
            });
            console.log(`Created service: ${created.title}`);
        } catch (error) {
            console.error(`Error processing service "${service.title}":`, error);
        }
    }

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
