import Header from "@/components/header"
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
import { Button } from "@/components/ui/button"

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

  // Todas barbearias
  const barbershopsRecommended = await db.barbershop.findMany({})

  // Populares (exemplo ordenando por nome, você pode mudar critério)
  const polularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  // Agendamentos confirmados do usuário logado
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

  const safeConfirmedBookings = (confirmedBookings || []).map(normalizeBooking)

  return (
    <div className="bg-color-back dark:bg-dark-color-back">
      {/* Header */}
      <Header />

      <div className="p-5 lg:flex lg:gap-6">
        {/* Coluna esquerda (Saudação, Busca, Agendamentos) */}
        <div className="gap-6 lg:flex lg:w-2/3 lg:flex-col">
          {/* Saudação + Data */}
          <div className="lg:ml-32">
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
          </div>

          {/* Barra de pesquisa */}
          <div className="mt-4 lg:ml-32">
            <Search />
          </div>

          {/* Busca Rápida */}
          <div className="mt-6 flex gap-3 overflow-x-auto lg:hidden [&::-webkit-scrollbar]:hidden">
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

          {/* Agendamentos */}
          <div className="mt-6">
            <h2 className="mb-3 text-xs font-bold uppercase text-color-text dark:text-dark-color-text-subtitle lg:ml-32">
              Agendamentos
            </h2>
            <div className="flex w-full gap-3 overflow-x-auto lg:ml-32 lg:w-[400px] [&::-webkit-scrollbar]:hidden">
              {safeConfirmedBookings.map((booking) => (
                <div key={booking.id} className="w-full flex-shrink-0">
                  <BookingItem booking={booking} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna direita (Recomendados) */}
        <div className="mt-6 lg:mt-0 lg:w-1/3">
          <h2 className="mb-3 text-xs font-bold uppercase text-color-text dark:text-dark-color-text-subtitle lg:-ml-[150px] xl:-ml-[220px]">
            Recomendados
          </h2>
          <RecommendedList barbershops={barbershopsRecommended} />
        </div>
      </div>

      {/* Populares */}
      <div className="mt-6 px-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-color-text dark:text-dark-color-text-subtitle lg:mx-32">
          Populares
        </h2>
        <PopularList barbershops={polularBarbershops} />
      </div>
    </div>
  )
}

export default Home
