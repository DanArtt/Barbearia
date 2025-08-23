"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { LogOutIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { useSession } from "next-auth/react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { signOut } from "next-auth/react"

const Header = () => {
  const { data } = useSession()
  return (
    <Card className="rounded-none border-none bg-color-navbar dark:bg-dark-color-navbar">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image
            src="/logoBarbearia.png"
            alt="Logo do Site"
            height={18}
            width={120}
            className="lg:ml-32"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            {/* Conteudo Mobile */}
            <Button
              className="bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button sm:hidden"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="flex justify-center" />
            </Button>
          </SheetTrigger>

          {/* Conteudo Desktop */}
          <div className="hidden sm:block">
            <div className="flex gap-3 lg:mr-32">
              <ThemeToggle />
              <Button className="flex items-center justify-center bg-gray-50/0 hover:bg-gray-50/0">
                {" "}
                <Image
                  src="/calendar.svg"
                  alt="icone calendario"
                  width={16}
                  height={16}
                />
                <Link href="/bookings">Agendamentos</Link>
              </Button>
              {data?.user ? (
                <div className="flex items-center gap-3">
                  {/* Avatar + Nome */}
                  <div className="flex items-center justify-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={data?.user?.image ?? ""}
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = "/default-avatar.png"
                        }}
                      />
                    </Avatar>

                    <p className="text-sm font-bold text-color-back dark:text-dark-color-text-title">
                      {data.user.name}
                    </p>
                  </div>

                  {/* Botão de sair com confirmação */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-none bg-color-button hover:bg-color-canceled dark:bg-dark-color-button dark:hover:bg-color-canceled"
                      >
                        <LogOutIcon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-xl bg-color-card dark:bg-dark-color-card">
                      <h2 className="text-lg font-semibold text-color-back dark:text-dark-color-text-title">
                        Deseja realmente sair?
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-dark-color-text-subtitle">
                        Você precisará fazer login novamente para acessar sua
                        conta.
                      </p>

                      <DialogFooter className="mt-4 flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="border-none bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
                          >
                            Cancelar
                          </Button>
                        </DialogClose>
                        <Button
                          className="bg-color-canceled hover:bg-[#d82121] active:bg-[#590d0d]"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Sair
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 rounded-lg bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button md:pb-5">
                      <Image
                        src="/User.svg"
                        alt="icone usuário"
                        width={16}
                        height={16}
                      />
                      Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%] rounded-xl bg-color-card dark:bg-dark-color-card lg:h-[200px] lg:w-[400px]">
                    <SignInDialog />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
