import { Search } from "@/components/Search";
import { SuggestedFriendCard } from "@/components/SuggestedFriendCard";
import { currentUser } from "@/lib/actions/user-actions";
import { prisma } from "@/lib/constants";

export default async function Discover() {

  const users  = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      friends: true,
      friendRequests: true
    }
  })

  const user = await currentUser()
  const suggestedFriends = users.slice(0).filter(suggested => suggested.id !== user?.id)

  return (
    <section className="w-full flex py-2 mt-8 justify-center">
    <div className="flex flex-col w-full max-w-[800px] gap-8 px-2">
      <Search/>
      <h2 className="font-semibold text-2xl">Suggested Friends</h2>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        { 
          suggestedFriends.map(friend => <SuggestedFriendCard key={friend.id} username={friend.username} receiver={friend.id} sender={user?.id} friendRequests={friend.friendRequests} friends={friend.friends}/>)
        }
      </section>
    </div>
    </section>
  )
}
