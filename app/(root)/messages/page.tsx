import { FriendChat } from "@/components/FriendChat";
import { UserCircle } from "@/components/UserCircle";
import { currentUser } from "@/lib/actions/user-actions";
import { prisma } from "@/lib/constants";
import { IoSearch } from "react-icons/io5";

export default async function Messages() {

  const user  = await currentUser()

  const me = await prisma.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      friends: true,
      friendRequests: true
    }
  })

  return (
    <section className="w-full flex items-start justify-center min-h-screen p-2">
      <main className="flex flex-col gap-4 w-full max-w-[800px] items-center justify-center mt-8">
        <div className="w-full max-w-[800px] h-10 rounded-[5px] p-2 flex items-center gap-3 border border-[--border-bg]">
            <IoSearch className="size-5 text-[--icon-bg]"/>
            <input 
            type="search" 
            className="w-full text-sm font-light outline-none placeholder:text-xs bg-transparent"
            placeholder="Search through chats"
            />
        </div>
        <div className="flex flex-col w-full self-center mt-8 gap-2">
          <h3 className="text-xl font-semibold text-start w-full">Active</h3>
          <div className="w-full flex gap-4">
            {
              Array(5).fill(null).map(user => <UserCircle key={user}/>)
            }
          </div>
        </div>
        <section className="flex gap-6 items-center self-center sm:self-start">
          <p className="text-center text-sm sm:text-md border border-[--border-bg] rounded-[10px] p-2 w-36 h-10">
            Recent Chats
          </p>
          <div className="flex gap-1 items-center justify-center text-sm sm:text-md border border-[--border-bg] rounded-[10px] p-2 w-36 h-10">
            <span>{ me?.friendRequests.length }</span>
            <p>Friend Requests</p>
          </div>
        </section>
        <section className="w-full h-full flex flex-col gap-2">
          {
            me?.friends.map(friend => (
              <FriendChat key={friend} userId={user?.id} id={friend}/>
            ))
          }
        </section>
      </main>
    </section>
  )
}
