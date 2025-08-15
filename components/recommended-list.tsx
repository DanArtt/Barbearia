// components/recommended-list.tsx
"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BarbershopItem from "@/components/barbershop-item"

interface RecommendedListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  barbershops: any[]
}

export default function RecommendedList({ barbershops }: RecommendedListProps) {
  const recommendedRef = useRef<HTMLDivElement>(null)

  const scrollRecommended = (direction: "left" | "right") => {
    if (recommendedRef.current) {
      const scrollAmount = direction === "left" ? -900 : 900
      recommendedRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      {/* Botão Esquerda - Desktop */}
      <button
        onClick={() => scrollRecommended("left")}
        className="absolute left-0 top-1/2 z-10 ml-2 hidden -translate-y-1/2 rounded-full bg-color-back p-2 text-color-text dark:bg-dark-color-back dark:text-dark-color-text-title lg:flex"
      >
        <ChevronLeft />
      </button>

      {/* Lista */}
      <div
        ref={recommendedRef}
        className="flex gap-4 overflow-x-auto scroll-smooth lg:mx-10 [&::-webkit-scrollbar]:hidden"
      >
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>

      {/* Botão Direita - Desktop */}
      <button
        onClick={() => scrollRecommended("right")}
        className="absolute right-0 top-1/2 z-10 mr-2 hidden -translate-y-1/2 rounded-full bg-color-back p-2 text-color-text dark:bg-dark-color-back dark:text-dark-color-text-title lg:flex"
      >
        <ChevronRight />
      </button>
    </div>
  )
}
