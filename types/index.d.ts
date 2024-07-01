import { MouseEventHandler } from "react";
import { string } from "zod";

declare type CustomButton = { 
    type: string
    isLoading: boolean
};

declare type LoginData = {
    username: string
    password: string
}

declare type RegisterData = {
    id: string
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    bio?: string
}

declare type User = {
    firstname: string
    lastname: string
    username: string
    avatar: string | null
}

declare type Button =  { 
    title: string
    redirect: string
}

declare type Message = {
    sender: string
    receiver: string
    content: string
    photo: string | null
    createdAt: string
}
  
declare type User = {
    userId: string
    username: string
}

declare type Conversation = {
    senderId: string
    receiverId: string,
    createdAt: Date
}