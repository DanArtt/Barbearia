"use client"
import { Prisma } from "@/app/generated/prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { toast } from "sonner"
import { useState } from "react"
import { cancelBooking } from "@/app/_actions/cancel-booking"
import { Textarea } from "./ui/textarea"
import { useRouter } from "next/navigation"

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

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const router = useRouter()

  const isConfirmed = isFuture(booking.date) && !booking.canceled
  const [cancelReason, setCancelReason] = useState("") // ✅ motivo do cancelamento
  const handleCancelBooking = async () => {
    try {
      await cancelBooking(booking.id, cancelReason)
      setIsSheetOpen(false)
      toast.success("Agendamento cancelado com sucesso!")
      router.refresh() // 🔹 Atualiza a lista sem reload total
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error)
      toast.error("Erro ao cancelar agendamento. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[95%]">
          <CardContent className="flex justify-between border-none bg-color-card p-0 dark:bg-dark-color-card">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 px-5 py-5">
              <Badge
                className="w-fit"
                variant={
                  booking.canceled
                    ? "destructive"
                    : isConfirmed
                      ? "default"
                      : "secondary"
                }
              >
                {booking.canceled
                  ? "Cancelado"
                  : isConfirmed
                    ? "Confirmado"
                    : "Finalizado"}
              </Badge>
              <h3 className="text-left text-lg font-semibold">
                {booking.service.name}
              </h3>
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

            {/* Direita */}
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
      </SheetTrigger>

      <SheetContent className="w-[90%] bg-color-back dark:bg-dark-color-back">
        <SheetHeader>
          <SheetTitle className="-mb-4 mt-3 text-left text-color-text dark:text-dark-color-text-title">
            Informações da Reserva
          </SheetTitle>
          <div className="border-b border-solid py-5 dark:border-dark-color-card"></div>
        </SheetHeader>

        {/* Mapa */}
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt={`Mapa da localização da ${booking.service.barbershop.name}`}
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-10 mx-5 mb-3 w-full rounded-xl bg-color-card dark:bg-dark-color-card">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="text-xs dark:text-dark-color-text-subtitle">
                  {booking.service.barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes */}
        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={
              booking.canceled
                ? "destructive"
                : isConfirmed
                  ? "default"
                  : "secondary"
            }
          >
            {booking.canceled
              ? "Cancelado"
              : isConfirmed
                ? "Confirmado"
                : "Finalizado"}
          </Badge>

          <Card className="mb-6 mt-3 bg-color-card dark:bg-dark-color-card">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400 dark:text-dark-color-text-subtitle">
                  Data
                </h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400 dark:text-dark-color-text-subtitle">
                  Horário
                </h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400 dark:text-dark-color-text-subtitle">
                  Barbearia
                </h2>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Telefones */}
        <div className="space-y-3">
          {booking.service.barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>

        {booking.canceled && booking.cancelReason && (
          <Card className="mt-6 border border-color-canceled bg-color-back dark:bg-dark-color-back">
            <CardContent className="space-y-3 p-3">
              <h3 className="mb-1 text-sm font-bold text-color-text dark:text-dark-color-text-title">
                Motivo do Cancelamento:
              </h3>
              <p className="text-sm text-gray-700 dark:text-dark-color-text-subtitle">
                {booking.cancelReason}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Botões */}
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full rounded-xl bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
              >
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && !booking.canceled && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full rounded-xl">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%] rounded-xl bg-color-card dark:bg-dark-color-card">
                  <DialogHeader>
                    <DialogTitle>Cancelar Agendamento ?</DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá sua reserva e não poderá
                      recuperá-la. Tem certeza que deseja continuar?
                    </DialogDescription>
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-dark-color-text-subtitle">
                        Motivo do cancelamento:
                      </label>
                      <Textarea
                        placeholder="Digite o motivo..."
                        className="w-full border-color-button bg-color-card dark:bg-dark-color-card"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                      />
                    </div>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
                      >
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full rounded-xl"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {booking.canceled && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full rounded-xl">
                    Excluir Agendamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%] rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Excluir Agendamento?</DialogTitle>
                    <DialogDescription>
                      Essa ação é irreversível e removerá permanentemente este
                      agendamento do histórico.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full rounded-xl">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full rounded-xl"
                        onClick={async () => {
                          try {
                            const { deleteBooking } = await import(
                              "@/app/_actions/delete-booking"
                            )
                            await deleteBooking(booking.id)
                            toast.success("Agendamento excluído com sucesso!")
                            setIsSheetOpen(false)
                            router.refresh() // ou router.refresh() se preferir
                          } catch (error) {
                            console.error("Erro ao excluir:", error)
                            toast.error("Erro ao excluir agendamento")
                          }
                        }}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
