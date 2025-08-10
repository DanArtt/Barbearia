"use server"

import { db } from "../_lib/prisma"

export async function deleteAllCanceledBookings(userId: string) {
  return await db.booking.deleteMany({
    where: { userId, canceled: true },
  })
}
