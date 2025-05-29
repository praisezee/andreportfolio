import { Linkedin, Mail, Heart, Figma } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Image src="/logo-dark.png" alt="André's Creation" width={60} height={40} className="h-8 w-auto mb-4" />
            <p className="text-gray-300 leading-relaxed max-w-md">
              Creating digital experiences that inspire and engage. Specializing in modern UI/UX design and compelling
              graphic design solutions for brands and products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#A3BFFA] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#A3BFFA] transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="text-gray-300 hover:text-[#A3BFFA] transition-colors duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-gray-300 hover:text-[#A3BFFA] transition-colors duration-300">
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-gray-300 hover:text-[#A3BFFA] transition-colors duration-300"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-[#A3BFFA] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {[
                { icon: Figma, href: "https://figma.com", label: "Figma" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:andrescreation1@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-[#1E3A8A] transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} André's Creation. All rights reserved.</p>
          <p className="text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by André
          </p>
        </div>
      </div>
    </footer>
  )
}
