import { ReactNode } from "react"

export const ChatCard = ({ content, className }: { content: string, className: string }) => {
  return (
    <article 
    className={`min-w-[50px] max-w-[500px] h-min rounded-[5px] px-4 py-2 border border-[--border-bg] text-sm text-wrap ${className}`}
    >
      { content }
    </article>
  )
}
