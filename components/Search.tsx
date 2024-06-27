'use client'

import { fetchUsers } from "@/lib/actions/user-actions"
import { User } from "@/types"
import { useEffect, useRef, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { UserCard } from "./UserCard"
import Link from "next/link"

export const Search = () => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState<User[] | null>(null)
    const searchRef = useRef<HTMLInputElement | null>(null)

    const handleSearch = () => {
      if(searchRef.current){
        setSearch(searchRef.current.value)
      }
    }
    
    useEffect(() => {
      const fetch = async () => {
        if (search) {
          const users = await fetchUsers(search)
          setUsers(users)
        }
      }
      fetch()
    }, [search])
    
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col gap-1 items-center w-full max-w-[500px]">
            <h1 className="text-xl text-start w-full font-bold tracking-wide text-[--secondary-text]">Discover</h1>
            <div className="w-full h-8 rounded-[5px] p-2 flex items-center divide-x-2 gap-3 border border-[--border-bg]">
              <IoSearch className="size-5 text-[--secondary-text]"/>
              <input 
              type="search" 
              className="w-full text-sm font-light outline-none placeholder:text-xs"
              placeholder="Find your friends"
              ref={searchRef}
              onChange={handleSearch}
              />
            </div>
      </div>
      <div className="flex flex-col gap-4 w-[500px]">
          { 
            users?.map((user: User) => 
            <Link href={`/profile/${user.username}`}
              key={user.username}
            >
              <UserCard
              username={user.username} 
              avatar={user.avatar} 
              /> 
            </Link>
          )
          }
      </div>
    </section>
  )
}
