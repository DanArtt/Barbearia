"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone Copiado com Sucesso!!")
  }
  return (
    <div className="flex justify-between" key={phone}>
      {/* CONTEUDO DA ESQUERDA */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon className="text-color-card dark:text-dark-color-card" />
        <p className="text-sm text-color-text dark:text-dark-color-text-title">
          {phone}
        </p>
      </div>
      {/* CONTEUDO DA DIREITA */}
      <Button
        className="dark: border-none bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
