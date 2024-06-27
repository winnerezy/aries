import { Search } from "@/components/Search";
import { PrismaClient } from '@prisma/client'

export default function Discover() {

  return (
    <section className="w-full p-2 mt-8">
    <Search/>
    </section>
  )
}
