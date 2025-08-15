// app/page.tsx
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "@/components/booking-item"
import Search from "@/components/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import PopularList from "@/components/popular-list"
import RecommendedList from "@/components/recommended-list"

/* eslint-disable @typescript-eslint/no-explicit-any */

function normalizeBooking(booking: any) {
  return {
    ...booking,

    date:
      booking.date instanceof Date
        ? booking.date.toISOString()
        : String(booking.date),
    service: {
      ...booking.service,

      price:
        booking.service?.price?.toString &&
        typeof booking.service.price.toString === "function"
          ? booking.service.price.toString()
          : booking.service?.price,
      barbershop: {
        ...booking.service?.barbershop,
      },
    },
  }
}

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
          canceled: false,
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

  // Normaliza para evitar passar Decimal/date não serializáveis para Client Components
  const safeConfirmedBookings = (confirmedBookings || []).map(normalizeBooking)

  return (
    <div className="bg-color-back dark:bg-dark-color-back">
      {/* Header */}
      <Header />
      {/* Texto do Usuário */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-color-text dark:text-dark-color-text-title">
          Olá, {session?.user ? session.user.name : "Bem-Vindo"}!
        </h2>
        <p>
          <span className="capitalize text-color-text dark:text-dark-color-text-title">
            {format(new Date(), "EEEE, dd ", { locale: ptBR })}
          </span>
          <span className="text-color-text dark:text-dark-color-text-title">
            {format(new Date(), "'de' MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* Input de busca + botão */}
        <div className="mt-6">
          <Search />
        </div>
        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2 bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-color-text dark:text-dark-color-text-subtitle">
          Agendamentos
        </h2>
        {/* Agendamento */}
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {safeConfirmedBookings.map((booking) => (
            <div key={booking.id} className="w-full flex-shrink-0">
              <BookingItem booking={booking} />
            </div>
          ))}
        </div>
        {/* Visualização das Barbearias Recomendadas */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-color-text dark:text-dark-color-text-subtitle lg:mx-10">
          Recomendadas
        </h2>
        <RecommendedList barbershops={barbershops} />
        {/* Visualização das Barbearias Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-color-text dark:text-dark-color-text-subtitle lg:mx-10">
          Populares
        </h2>
        <PopularList barbershops={polularBarbershops} />
      </div>
      {/* Footer */}
    </div>
  )
}

export default Home
