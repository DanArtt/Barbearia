import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça Login na Plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-1 bg-color-button font-bold hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
        onClick={handleLoginWithGoogleClick}
      >
        <Image src="/google.svg" alt="Google Icone" width={18} height={18} />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
