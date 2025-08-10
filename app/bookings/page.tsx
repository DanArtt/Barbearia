import { getServerSession } from "next-auth"
import Header from "@/components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "@/components/booking-item"
import DeleteCanceledButton from "../../components/deleteCanceledButton"
/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper para normalizar dados vindos do Prisma
function normalizeBooking(booking: any) {
  return {
    ...booking,
    date:
      booking.date instanceof Date
        ? booking.date.toISOString()
        : String(booking.date),
    canceledAt:
      booking.canceledAt instanceof Date
        ? booking.canceledAt.toISOString()
        : booking.canceledAt,
    service: {
      ...booking.service,
      price: booking.service?.price?.toString
        ? booking.service.price.toString()
        : booking.service.price,
      barbershop: {
        ...booking.service?.barbershop,
      },
    },
  }
}

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const userId = (session.user as any).id

  // Confirmados
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId,
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

  // Finalizados
  const concludedBookings = await db.booking.findMany({
    where: {
      userId,
      canceled: false,
      date: {
        lt: new Date(),
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

  // Cancelados
  const canceledBookings = await db.booking.findMany({
    where: {
      userId,
      canceled: true,
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

  const safeConfirmed = confirmedBookings.map(normalizeBooking)
  const safeConcluded = concludedBookings.map(normalizeBooking)
  const safeCanceled = canceledBookings.map(normalizeBooking)

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {/* Confirmados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Confirmados
        </h2>
        {safeConfirmed.length > 0 ? (
          safeConfirmed.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum agendamento confirmado.
          </p>
        )}

        {/* Finalizados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Finalizados
        </h2>
        {safeConcluded.length > 0 ? (
          safeConcluded.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum agendamento finalizado.
          </p>
        )}

        {/* Cancelados */}
        <div className="mb-3 mt-6 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Cancelados
          </h2>
          {safeCanceled.length > 0 && <DeleteCanceledButton userId={userId} />}
        </div>

        {safeCanceled.length > 0 ? (
          safeCanceled.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhum agendamento cancelado.</p>
        )}
      </div>
    </>
  )
}

export default Bookings
