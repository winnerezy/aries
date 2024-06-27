import { ChatCard } from "@/components/ChatCard";
import { UserCircle } from "@/components/UserCircle";

export default function Messages() {
  return (
    <section className='w-full p-2 flex flex-col gap-6 justify-center'>
        <section className="w-full flex flex-col gap-2 mt-8 items-center justify-center">
        <p className='font-semibold text-xl text-[--secondary-text]'>Recent Chats</p>
        <div className="user-circle w-full items-center justify-center">
            <UserCircle/>
            <UserCircle/>
            <UserCircle/>
            <UserCircle/>
            <UserCircle/>
        </div>
        </section>
        <section className="flex flex-col gap-1 items-center justify-center">
          {/* { Array(20).fill(null).map((chat, index) => <ChatCard key={index}/>) } */}
        </section>
    </section>
  )
}
