'use client'

import { FriendButton } from "./FriendButton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useState } from "react"
import { socket } from "@/app/socket"
import Link from "next/link"

export const SuggestedFriendCard = ({ username, sender, friends, receiver, friendRequests }: { username: string, sender: string | undefined, receiver: string, friends: string[], friendRequests: string[] }) => {
  
  //   const [message, setMessage] = useState<string>(friendRequests?.includes(sender!) ? "Request Sent" : "Add as friend")
 
  //   useEffect(()=> {
  //     socket.emit('register', sender)
  // }, [sender, receiver])

  //   const handleFriendRequest = () => {
  //   socket.emit('friend request', { sender, receiver })
  //   setMessage("Request Sent")
  // }

  return (
    <div className="flex flex-col items-center justify-center w-full sm:max-w-[400px] h-[200px] bg-[--card-bg] rounded-[10px] p-2 gap-2 text-[--primary2-text]">
        <Avatar className="border border-[--circle-card-border-bg] flex items-center justify-center size-24">
            <AvatarImage src="" />
            <AvatarFallback className="font-semibold">{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${username}`}>{ username }</Link>
        <FriendButton sender={sender} receiver={receiver} friendRequests={friendRequests} friends={friends}/>
    </div>
  )
}
