import { verifySession } from "@/lib/session"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const session = req.cookies.get('session')?.value as string

        const verify = await verifySession(session)

        const userId = verify?.payload.sub as string
        
        return new NextResponse(JSON.stringify({ userId }))
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}