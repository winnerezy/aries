import { prisma } from "@/lib/constants"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params: { userId } }: { params: { userId: string } }) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        
        return new NextResponse(JSON.stringify(user))
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}

