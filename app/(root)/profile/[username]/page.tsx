import { CustomButton } from '@/components/CustomButton'
import { prisma } from '@/lib/constants'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"

export default async function Profile({ params: { username } }: { params: { username: string } }) {

  const userId = headers().get('userId') as string
  const user = await prisma.user.findUnique({
    where: {
      username: username
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      username: true
    }
  })

  if(!user){
   redirect('/discover')
  }
  
  const userIdMatch = userId === user.id

  return (
    <section className='w-full p-2 flex flex-col gap-4'>
      <div className='flex gap-4 items-center mt-8'>
        <Avatar className="border border-[--border-bg] flex items-center justify-center size-24">
          <AvatarImage src="" />
          <AvatarFallback className="font-semibold">{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-md text-[--secondary-text]'>{` ${ user?.firstname } ${ user?.lastname }` }</p>
          <p className='text-xs'>@{ user?.username }</p>
        </div>

      <section>
        { 
          userIdMatch ?
          <CustomButton title='Edit Profile' redirect='edit-profile'/>
          :
          <CustomButton title='Message' redirect = {`/messages/${user.id}`}/>
        }
      </section>
      </div>
    </section>
  )
}
