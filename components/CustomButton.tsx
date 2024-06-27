'use client'

import { Button } from "@/types"
import Link from "next/link"

export const CustomButton = ({ title, redirect: url }: Button) => {
  return (
   <Link href={url}>
      <button className="border border-[--border-bg] w-20 h-8 rounded-[5px] shadow-md text-xs p-2 z-30">
        <p>{ title }</p>
      </button>
   </Link>
  )
}
