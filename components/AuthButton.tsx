'use client'

import { CustomButton } from "@/types";
import { Button } from "./ui/button";
import CircularProgress from '@mui/material/CircularProgress';

export default function AuthButton({ type, isLoading }: CustomButton) {
  console.log(isLoading)
  return (
    <Button
      type="submit"
      className="p-2 w-24 h-8 rounded-[5px]  border-2 border-[--border-bg] tracking-wide text-sm hover:bg-[var(--global-button-bg)] transition duration-200 ease-in-out self-center shadow-md"
      disabled={isLoading}
    >
      {
        isLoading ?
       <div className="flex gap-2 items-center">
         <CircularProgress size={20} className="text-[--loader-bg]"/>
         <span className="text-xs">Loading</span>
       </div>
        :
        <p>
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </p>
      }
    </Button>
  );
}