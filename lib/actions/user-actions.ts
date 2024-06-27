'use server'
import { prisma } from "@/lib/constants"
import { headers } from "next/headers"

export const fetchUsers = async (username: string) => {
    const user = await prisma.user.findMany({
        where: {
            username
        },
        select: {
            firstname: true,
            lastname: true,
            username: true,
            avatar: true
        }
    })
    return user
}

export const currentUser = async () => {
    const userId = headers().get('userId') as string
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true
      }
    })
  return user
}