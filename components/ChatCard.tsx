import { Message } from "@/types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

interface ChatCard extends Message {
  className: string
}

dayjs.extend(relativeTime)

export const ChatCard = ({ content, createdAt, className }: ChatCard) => {

  const date = dayjs().to(dayjs(createdAt))
  // const date = new Date(createdAt).toLocaleString()
  return (
    <article 
    className={`min-w-[50px] max-w-[300px] sm:max-w-[500px] h-min rounded-[5px] px-4 py-2 bg-[--chat-card-bg] text-[--chat-card-text] text-sm text-wrap ${className}`}
    >
      <p>{ content }</p>
      <p className="text-[8px] text-end">{ date }</p>
    </article>
  )
}
