'use server'
import { prisma } from "@/lib/constants"
import { headers } from "next/headers"

export const fetchUsers = async (username: string) => {
    try {
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
    } catch (error: any) {
      console.log(error.message)
      return null
    }
}

export const currentUser = async () => {
  try {
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
  } catch (error: any) {
    console.log(error.message)
    return null
  }
}