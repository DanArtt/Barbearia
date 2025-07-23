import { authOptions } from "@/app/_lib/auth"
import NextAuth from "next-auth"
/* eslint-disable @typescript-eslint/no-explicit-any */

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
