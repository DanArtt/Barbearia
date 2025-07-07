import Header from "@/components/header"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

const Home = () => {
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
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            {/* Conteudo da Esquerda do Card */}
            <div className="flex flex-col gap-2 px-5 py-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="item-center flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png"
                    alt="Logo da Barbearia"
                  />
                </Avatar>
                <p className="text-sm">Barbearia Vintage</p>
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
      </div>
    </div>
  )
}

export default Home
