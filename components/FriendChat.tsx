import { prisma } from "@/lib/constants"
import { redis } from "@/lib/redis"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const FriendChat = async ({ userId, id }: { userId: string | undefined, id: string }) => {

    const friend = await prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            firstname: true,
            avatar: true
        }
    })

    const message = await redis.lindex(`messages:${id}:${userId}`, -1)
    
  return (
    <div className="flex items-center gap-4 w-full h-16 rounded-[10px] px-4 border border-[--border-bg] shadow-md">
        <Avatar className="border border-[--border-bg] flex items-center justify-center size-12">
            <AvatarImage src={friend?.avatar!} />
            <AvatarFallback className="font-semibold">{friend?.firstname[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col items-start">
            <p>{ friend?.firstname }</p>
            <p>{ message?.content }</p>
        </div>
    </div>
  )
}