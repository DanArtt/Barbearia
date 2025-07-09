import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="flex items-center justify-center gap-1 text-center font-light text-gray-400">
            © 2025 Copyright
            <span className="font-bold">Daniel de Andrade</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
