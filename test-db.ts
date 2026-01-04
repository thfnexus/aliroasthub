import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Testing database connection...')
    try {
        await prisma.$connect()
        console.log('Check 1: Database connection established.')

        const count = await prisma.user.count()
        console.log(`Check 2: Successfully queried database. User count: ${count}`)

        console.log('SUCCESS: Database and Prisma Client are correctly configured.')
    } catch (e) {
        console.error('FAILURE: Database connection failed.')
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
