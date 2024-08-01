'use client'

import { socket } from "@/app/socket"
import { useEffect, useState } from "react"

type FriendButton = {
    sender: string | undefined
    receiver: string
    friends: string[]
    friendRequests: string[]
}

export const FriendButton = ({sender, receiver, friends, friendRequests }: FriendButton) => {

  const [message, setMessage] = useState<string>(
    friends.includes(sender!) ?
    "Unfriend"
    : 
    friendRequests?.includes(sender!) ?
     "Request Sent" 
     :
    !friendRequests?.includes(sender!) ?
      "Add friend"
    :
    ""
  )
  const [sentRequest, sentSentRequest] = useState<boolean>(friendRequests?.includes(sender!) ? true : false)
  
  useEffect(()=> {
    socket.emit('register', sender)
}, [sender])

  const handleFriendRequest = () => {
 
  if(sentRequest){
    socket.emit('unsend friend request', { sender, receiver })
    setMessage("Add Friend")
    sentSentRequest(false)
  } else if(!sentRequest) {
    socket.emit('friend request', { sender, receiver })
    setMessage("Request Sent")
    sentSentRequest(true)
  }
}

  return (
    <button 
    className="font-semibold text-sm text-[--primary2-text] bg-[--button-bg] p-2 rounded-[10px] w-[150px] h-10"
    onClick={handleFriendRequest}
    >
        { message }
    </button>
  )
}
