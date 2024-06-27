import { prisma } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPassword
        const user = await prisma.user.create({ data })
        await createSession(user.id)
        console.log(user)
        return new NextResponse(JSON.stringify(user))
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(JSON.stringify(error), {
            status: 500
        })
    }
}