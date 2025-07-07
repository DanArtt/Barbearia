import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "@/components/booking-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const polularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Texto do Usuário */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Daniel!</h2>
        <p>Domingo, 06 de Julho</p>

        {/* Input de busca + botão */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Search..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/* Busca Rápida */}
        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageURL}
                alt={option.title}
                height={16}
                width={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Banner 01 */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Banner-01"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* Agendamento */}
        <BookingItem />
        {/* Visualização das Barbearias Recomendadas */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {/* Visualização das Barbearias Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {polularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="flex items-center justify-center gap-1 text-center font-light text-gray-400">
              © 2025 Copyright
              <span className="font-bold">Daniel de Andrade</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
