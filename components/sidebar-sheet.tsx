"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "@/app/_constants/search"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn } from "next-auth/react"

const SidebarSheet = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <h2 className="font-bold">Olá, faça seu Login!</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-xl">
            <DialogHeader>
              <DialogTitle>Faça Login na Plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta Google
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              className="gap-1 font-bold"
              onClick={handleLoginWithGoogleClick}
            >
              <Image
                src="/google.svg"
                alt="Google Icone"
                width={18}
                height={18}
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage src="https://i.pinimg.com/1200x/80/94/fa/8094fa75e66ff5a0a4d08c3dda0ba5c9.jpg" />
        </Avatar>
        <div>
          <p className="mb-[-2px] font-bold">Daniel de Andrade</p>
          <p className="text-xs text-gray-400">daniel@gmail.com</p>
        </div> */}
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
