import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FaCircle } from "react-icons/fa6";

export const ChatHeader = ({ receiver, userStatus, typing }: { receiver: User | undefined, userStatus: string, typing: string | null }) => {
  return (
    <header className='w-full h-24 flex gap-4 self-center items-center p-2 mt-4'>
        <div className='relative'>
        <Avatar className="border border-[--border-bg] flex items-center justify-center self-center size-16">
            <AvatarImage src="" />
            <AvatarFallback className="font-semibold">{receiver?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <FaCircle className={`absolute bottom-0 right-2 ${userStatus === "Online" ? 'text-[--online-bg]' : userStatus === "Offline" ? 'text-[--offline-bg]' : ""}`}/>
        </div>
        <div className='flex flex-col gap-2'>
          <p>
          {receiver?.firstname}
          </p>
          <p>
            { typing }
          </p>
        </div>
    </header>
  )
}
