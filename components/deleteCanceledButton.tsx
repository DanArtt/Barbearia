"use client"

import { useTransition } from "react"
import { deleteAllCanceledBookings } from "../app/_actions/deleteAllCanceled-booking"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  userId: string
}

export default function DeleteCanceledButton({ userId }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteAllCanceledBookings(userId)
        router.refresh()
        toast.success("Agendamentos excluídos com sucesso!")
      } catch {
        toast.error("Erro ao excluir os agendamentos. Tente novamente.")
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex rounded-xl bg-color-canceled px-4 py-2 text-white hover:bg-red-600"
    >
      {isPending ? "Excluindo..." : "Excluir"}
    </button>
  )
}
