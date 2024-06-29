import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserCard = ({ username, avatar }: { username: string, avatar: string | null}) => {
  return (
    <div className="flex items-center justify-between px-4 gap-4 border border-[--border-bg] rounded-[5px] p-2 w-full h-14">
      <section className="flex gap-4 items-center">
        <Avatar className="border border-[--border-bg] flex items-center justify-center">
          <AvatarImage src="" />
          <AvatarFallback className="font-semibold">{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <p>
          @{ username }
        </p>
      </section>
      <Link href={`/profile/${username}`} className="text-xs border border-[--border-bg] p-2 rounded-[5px]">
        View Profile
      </Link>
    </div>
  )
}
