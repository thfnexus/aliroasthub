import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
    const email = 'aliroasthub@gmail.com'
    const passwordRaw = 'AliRoast@2026!Admin'
    const hashedPassword = await bcrypt.hash(passwordRaw, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN',
            password: hashedPassword
        },
        create: {
            email,
            name: 'Ali Roast Admin',
            password: hashedPassword,
            role: 'ADMIN'
        }
    })

    console.log(`Success! User ${user.email} is now an ADMIN.`)
    console.log(`Password set to: ${passwordRaw}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
