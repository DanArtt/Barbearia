"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export async function cancelBooking(bookingId: string, reason?: string) {
  await db.booking.update({
    where: { id: bookingId },
    data: {
      canceled: true,
      canceledAt: new Date(),
      cancelReason: reason || null,
    },
  })

  // 🔹 Faz a revalidação antes de retornar
  revalidatePath("/bookings")
}
