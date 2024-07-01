import { redis } from "@/lib/redis";
import { verifySession } from "@/lib/session";
import { Message } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params: { userId } }:  { params: { userId: string } }) => {

    try {
        const session = req.cookies.get('session')?.value as string

        const verify = await verifySession(session)
    
        const currentUserId = verify?.payload.sub as string
    
        const messages: Message[] = await redis.lrange(`messages:${currentUserId}:${userId}`, 0, -1);
      
        // sorting the messages from longest time form now recent
        const sortedMessages = messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); 

        return new NextResponse(JSON.stringify({ messages: sortedMessages }))
    } catch (error) {
        return new NextResponse(JSON.stringify({ messages: [] }), {
            status: 500
        })
    }

};
  