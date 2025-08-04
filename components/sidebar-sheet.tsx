"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "@/app/_constants/search"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user?.image ?? ""}
                height={50}
                width={50}
                className="rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png" // precisa estar em public/
                }}
              />
            </Avatar>

            <div>
              <p className="mb-[-2px] font-bold">{data.user.name}</p>
              <p className="text-xs text-gray-400">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu Login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-xl">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
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
          asChild
        >
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageURL}
                  alt={option.title}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {data?.user && (
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da Conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
