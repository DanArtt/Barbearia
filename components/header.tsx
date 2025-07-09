import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "@/app/_constants/search"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src="/logoBarbearia.png"
          alt="Logo do Site"
          height={18}
          width={120}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="https://i.pinimg.com/1200x/80/94/fa/8094fa75e66ff5a0a4d08c3dda0ba5c9.jpg" />
              </Avatar>
              <div>
                <p className="mb-[-2px] font-bold">Daniel de Andrade</p>
                <p className="text-xs text-gray-400">daniel@gmail.com</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button
                  className="flex items-center justify-start gap-2"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={18} />
                    Ínicio
                  </Link>
                </Button>
              </SheetClose>
              <Button
                className="flex items-center justify-start gap-2"
                variant="ghost"
              >
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>
            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image
                    src={option.imageURL}
                    alt={option.title}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <Button variant="ghost" className="justify-start">
                <LogOutIcon size={18} />
                Sair da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
