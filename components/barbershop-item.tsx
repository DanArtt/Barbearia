import { Barbershop } from "@/app/generated/prisma"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl bg-color-card dark:bg-dark-color-card lg:min-w-[190px]">
      <CardContent className="p-0">
        {/* Imagem do Card de Barbearias */}
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            className="rounded-2xl object-cover p-1"
            fill
          />
          <Badge
            className="absolute left-2 top-2 space-x-1 bg-color-button/25"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-color-star text-color-star" />
            <p className="text-xs font-light opacity-100">5,0</p>
          </Badge>
        </div>
        {/* Texto do Card de Barbearias */}
        <div className="px-2 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400 dark:text-dark-color-text-subtitle">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="mt-3 w-full bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
