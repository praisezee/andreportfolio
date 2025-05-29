import { Hero } from "@/components/hero"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Skills } from "@/components/skills"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main className="fade-in">
        <Hero />
        <PortfolioPreview />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
