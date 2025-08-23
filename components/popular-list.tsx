// components/popular-list.tsx
"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BarbershopItem from "@/components/barbershop-item"
import { Button } from "./ui/button"

interface PopularListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  barbershops: any[]
}

export default function PopularList({ barbershops }: PopularListProps) {
  const popularRef = useRef<HTMLDivElement>(null)

  const scrollPopular = (direction: "left" | "right") => {
    if (popularRef.current) {
      const scrollAmount = direction === "left" ? -900 : 900
      popularRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {/* Botão Esquerda - Desktop */}
      <Button
        onClick={() => scrollPopular("left")}
        className="absolute left-0 top-1/2 z-10 ml-[105px] hidden h-10 w-10 -translate-y-1/2 rounded-full border-2 border-solid border-color-card bg-color-back p-2 text-color-text hover:bg-hover-color-button2 active:bg-active-color-button2 dark:bg-dark-color-back dark:text-dark-color-text-title dark:hover:bg-dark-hover-color-button active:dark:bg-dark-active-color-button lg:flex"
      >
        <ChevronLeft />
      </Button>

      {/* Lista */}
      <div
        ref={popularRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-5 lg:mx-32 [&::-webkit-scrollbar]:hidden"
      >
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>

      {/* Botão Direita - Desktop */}
      <Button
        onClick={() => scrollPopular("right")}
        className="absolute right-0 top-1/2 z-10 mr-[105px] hidden h-10 w-10 -translate-y-1/2 rounded-full border-2 border-solid border-color-card bg-color-back p-2 text-color-text hover:bg-hover-color-button2 active:bg-active-color-button2 dark:bg-dark-color-back dark:text-dark-color-text-title dark:hover:bg-dark-hover-color-button active:dark:bg-dark-active-color-button lg:flex"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
