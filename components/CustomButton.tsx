'use client'

import { Button } from "@/types"
import Link from "next/link"

export const CustomButton = ({ title, redirect: url }: Button) => {
  return (
   <Link href={url}>
       <button 
    className="font-semibold text-sm text-[--primary2-text] bg-[--button-bg] p-2 rounded-[10px] w-[150px] h-10">
        <p>{ title }</p>
      </button>
   </Link>
  )
}
