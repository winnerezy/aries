import { Message } from "@/types"
import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import { IoCheckmarkDone } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

interface ChatCard extends Message {
  className: string
}

dayjs.extend(LocalizedFormat, relativeTime)

export const ChatBubble = ({ photo, content, createdAt, className }: ChatCard) => {

  let date;

  if(dayjs(createdAt).isAfter(new Date(Date.now()))){
    date = dayjs(createdAt).format('lll')
  } else {
    date = dayjs(createdAt).format('LT')
  }

  return (
    <article 
    className={`min-w-[50px] max-w-[300px] sm:max-w-[500px] h-max rounded-[5px] px-4 py-2 bg-[--chat-bubble] border border-[--border-bg] text-sm text-wrap text-[--primary2-text] ${className}`}
    >
      {
        photo ?
        <Image src={photo} alt="photo" width={400} height={400} className="rounded-[5px]"/>
        : 
        ""
      }
      <p>{ content }</p>
      <p className="text-[10px] text-end">{ date }</p>
      <div>
      </div>
    </article>
  )
}
