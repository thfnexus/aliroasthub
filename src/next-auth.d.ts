import "next-auth";
import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client"; // Ensure this matches your Prisma enum

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: "ADMIN" | "USER";
            id: string;
            emailVerified: boolean | null;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * so we need to add them back if we want to retain them.
             */
        } & DefaultSession["user"];
    }

    interface User {
        role: "ADMIN" | "USER";
        emailVerified: boolean | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "ADMIN" | "USER";
        id: string;
    }
}
