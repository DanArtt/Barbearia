"use client"
import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { useRouter } from "next/navigation"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para fazer a Busca!",
  }),
})

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const router = useRouter()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${data.title}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-2 lg:max-w-[400px]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Pesquisar..."
                  {...field}
                  className="w-full border-0 bg-color-search-bar !placeholder-color-text focus-visible:outline-none dark:bg-dark-color-search-bar lg:h-8"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-color-button hover:bg-hover-color-button active:bg-active-color-button dark:bg-dark-color-button dark:hover:bg-dark-hover-color-button dark:active:bg-dark-active-color-button lg:h-8 lg:w-8"
          type="submit"
        >
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}

export default Search
