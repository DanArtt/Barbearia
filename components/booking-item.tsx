import { Prisma } from "@/app/generated/prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  return (
    <>
      {/* Agendamentos */}
      <Card className="min-w-[95%]">
        <CardContent className="flex justify-between p-0">
          {/* Conteudo da Esquerda do Card */}
          <div className="flex flex-col gap-2 px-5 py-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h3 className="text-lg font-semibold">{booking.service.name}</h3>
            <div className="item-center flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={booking.service.barbershop.imageUrl}
                  alt="Logo da Barbearia"
                />
              </Avatar>
              <p className="text-sm text-gray-400">
                {booking.service.barbershop.name}
              </p>
            </div>
          </div>
          {/* Conteudo da Direita do Card */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-2xl">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
