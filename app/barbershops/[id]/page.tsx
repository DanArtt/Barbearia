import { db } from "@/app/_lib/prisma"
import PhoneItem from "@/components/phone-item"
import ServiceItem from "@/components/service-item"
import SidebarSheet from "@/components/sidebar-sheet"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  // ✅ Serializa os services (price: Decimal -> number)
  const serializedServices = barbershop.services.map((service) => ({
    ...service,
    price: service.price.toNumber(),
  }))

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 border-none bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TEXTO ABAIXO DA IMAGEM */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold text-color-text dark:text-dark-color-text-title">
          {barbershop?.name}
        </h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="fill-color-text" size={18} />
          <p className="text-sm text-gray-700 dark:text-dark-color-text-subtitle">
            {barbershop?.address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-color-star text-color-star" size={18} />
          <p className="text-sm text-gray-700 dark:text-dark-color-text-subtitle">
            5,0 (806 Avaliações).
          </p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-700 dark:text-dark-color-text-title">
          Sobre Nós
        </h2>
        <p className="text-justify text-sm font-light text-color-text dark:text-dark-color-text-subtitle">
          {barbershop?.description}
        </p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-700 dark:text-dark-color-text-title">
          Serviços
        </h2>
        <div className="space-y-3">
          {serializedServices.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={{ name: barbershop.name }} // ✅ agora é um objeto serializável
              service={service}
            />
          ))}
        </div>
      </div>

      {/* CONTATOS */}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone, index) => (
          <PhoneItem key={`${phone}-${index}`} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
