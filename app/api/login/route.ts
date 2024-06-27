import { prisma } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { LoginData } from "@/types";

export const POST = async (req: NextRequest) => {
    const data: LoginData = await req.json()
    try {
        const user = await prisma.user.findFirst({ // finding the user with their username
            where: {
                username: data.username
            }
        })

        if(!user){
            return new NextResponse(JSON.stringify({ message: 'No user registered with this username' }), {
                status: 404
            })
        }

        const match = await bcrypt.compare(data.password, user?.password)

        if(!match){
            return new NextResponse(JSON.stringify({ message: 'Incorrect credentials' }), {
                status: 400
            })
        }

        await createSession(user.id)
        
        return new NextResponse(JSON.stringify(user))
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}