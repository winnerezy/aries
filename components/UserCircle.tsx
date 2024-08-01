import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserCircle = () => {
  return (
    <div>
      <Avatar className="border border-[--border-bg] flex items-center justify-center size-12 sm:size-16">
        <AvatarImage src="" />
        <AvatarFallback className="font-semibold">{'W'}</AvatarFallback>
      </Avatar>
    </div>
  )
}
