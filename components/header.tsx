import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
const Header = () => {
  return (
    <Card className="rounded-none border-none bg-color-navbar dark:bg-dark-color-navbar">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image
            src="/logoBarbearia.png"
            alt="Logo do Site"
            height={18}
            width={120}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
              size="icon"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
