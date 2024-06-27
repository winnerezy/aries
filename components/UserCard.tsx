import Image from "next/image"
import Link from "next/link"

export const UserCard = ({ username, avatar }: { username: string, avatar: string | null}) => {
  return (
    <div className="flex items-center justify-between px-4 gap-4 border border-[--border-bg] rounded-[5px] p-2 w-full h-14">
      <section>
        <div>
              <Image src={avatar ? avatar : ""} alt={username}  />
          </div>
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
