import { FaRegCompass } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { IoChatbubblesOutline } from "react-icons/io5";
import { currentUser } from "@/lib/actions/user-actions";
export const Bottombar = async() => {

    const user = await currentUser()
  return (
    <div className="z-20 w-full h-12 border-t-2 border-[--border-bg-2] md:hidden flex fixed bottom-0 px-8 items-center justify-between bg-[--secondary-bg]">
        <Link href={'/discover'}><FaRegCompass className="size-6"/></Link>
        <Link href={'/messages'}><IoChatbubblesOutline className="size-6"/></Link>
        <Link href={`/profile/${user?.username}`}><RxAvatar className="size-6"/></Link>
    </div>
  )
}
