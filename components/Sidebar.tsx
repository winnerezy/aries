import { FaRegCompass } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import Link from "next/link";
import { currentUser } from "@/lib/actions/user-actions";

export const Sidebar = async() => {

    const user = await currentUser()
  return (
    <aside className="hidden md:flex items-start justify-center border-r-2 w-[80px] min-h-screen bg-[--primary2-bg]">
        <div className="flex flex-col items-center justify-center gap-14 mt-[200px]">
            <Link href={'/discover'}><FaRegCompass className="size-6"/></Link>
            <Link href={'/messages'}><IoChatbubblesOutline className="size-6"/></Link>
            <Link href={`/profile/${user?.username}`}><RxAvatar className="size-6"/></Link>
        </div>
    </aside>
  )
}
