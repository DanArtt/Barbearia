import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// TODO: receber agendamento como prop
const BookingItem = () => {
  return (
    <>
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
    </>
  )
}

export default BookingItem
