import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main className="fade-in pt-16">
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </div>
  )
}
