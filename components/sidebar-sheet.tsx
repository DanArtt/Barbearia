import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "@/app/_constants/search"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import Image from "next/image"

const SidebarSheet = () => {
  return (
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
          <Button className="flex items-center justify-start gap-2" asChild>
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
  )
}

export default SidebarSheet
