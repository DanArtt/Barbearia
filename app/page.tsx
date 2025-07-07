import Header from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"

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
          <Button className="gap-2" variant="secondary">
            <Image
              src="/cabelo.svg"
              alt="logo Tesoura"
              height={16}
              width={16}
            />
            Cabelo
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image src="/barba.svg" alt="logo Barba" height={16} width={16} />
            Barba
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/Acabamento.svg"
              alt="logo Acabamento"
              height={16}
              width={16}
            />
            Acabamento
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/sobrancelha.svg"
              alt="logo Sobrancelha"
              height={16}
              width={16}
            />
            Sobrancelha
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/massagem.svg"
              alt="logo Massagem"
              height={16}
              width={16}
            />
            Massagem
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/hidratacao.svg"
              alt="logo hidratação "
              height={16}
              width={16}
            />
            Hidratação
          </Button>
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
        {/* Agendamentos */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* Conteudo da Esquerda do Card */}
            <div className="flex flex-col gap-2 px-5 py-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="text-lg font-semibold">Corte de Cabelo</h3>
              <div className="item-center flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png"
                    alt="Logo da Barbearia"
                  />
                </Avatar>
                <p className="text-sm text-gray-400">Barbearia Vintage</p>
              </div>
            </div>
            {/* Conteudo da Direita do Card */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Julho</p>
              <p className="text-2xl">08</p>
              <p className="text-sm">18:30</p>
            </div>
          </CardContent>
        </Card>
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
