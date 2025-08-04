import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "@/components/booking-item"
import Search from "@/components/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
/* eslint-disable @typescript-eslint/no-explicit-any */
const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const polularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Texto do Usuário */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Daniel!</h2>
        <p>Domingo, 06 de Julho</p>

        {/* Input de busca + botão */}
        <div className="mt-6">
          <Search />
        </div>
        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageURL}
                  alt={option.title}
                  height={16}
                  width={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner 01 */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Banner-01"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        {/* Agendamento */}
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        {/* Visualização das Barbearias Recomendadas */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendadas
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {/* Visualização das Barbearias Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {polularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      {/* Footer */}
    </div>
  )
}

export default Home
