import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="border-none">
        <CardContent className="bg-color-navbar px-5 py-6 dark:bg-dark-color-navbar">
          <p className="flex items-center justify-center gap-1 text-center font-light text-gray-200">
            © 2025 Copyright
            <span className="font-bold">Daniel de Andrade</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
