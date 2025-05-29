import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Portfolio } from "@/components/portfolio"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main className="fade-in pt-16">
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}
