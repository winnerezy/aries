import { prisma } from "@/lib/constants";
import { redis } from "@/lib/redis";
import { verifySession } from "@/lib/session";
import { Conversation, Message } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    try {
        const session = req.cookies.get('session')?.value as string

        const verify = await verifySession(session)
    
        const currentUserId = verify?.payload.sub as string
 
        const conversations: Conversation[] = await prisma.conversation.findMany({
            where: {
              senderId: currentUserId
            }
          })

        return new NextResponse(JSON.stringify(conversations))
    } catch (error) {
        return new NextResponse(JSON.stringify({ messages: [] }), {
            status: 500
        })
    }

};
  