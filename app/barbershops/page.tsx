import BarbershopItem from "@/components/barbershop-item"
import { db } from "../_lib/prisma"
import Header from "@/components/header"
import Search from "@/components/search"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })
  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>
        <div className="gap grid grid-cols-2">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
