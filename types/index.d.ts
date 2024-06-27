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