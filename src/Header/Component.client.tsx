// 'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
//
// import type { Header } from '@/payload-types'
//
// import { Logo } from '@/components/Logo/Logo'
// import { HeaderNav } from './Nav'
//
// interface HeaderClientProps {
//   data: Header
// }
//
// export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
//   /* Storing the value in a useState to avoid hydration errors */
//   const [theme, setTheme] = useState<string | null>(null)
//   const { headerTheme, setHeaderTheme } = useHeaderTheme()
//   const pathname = usePathname()
//
//   useEffect(() => {
//     setHeaderTheme(null)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname])
//
//   useEffect(() => {
//     if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [headerTheme])
//
//   return (
//     <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
//       <div className="py-8 flex justify-between">
//         <Link href="/">
//           <Logo loading="eager" priority="high" className="invert dark:invert-0" />
//         </Link>
//         <HeaderNav data={data} />
//       </div>
//     </header>
//   )
// }
'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header, User } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Aperture, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Effect, pipe } from 'effect'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/Auth'

interface HeaderClientProps {
  data: Header
  user: User;
}

const logoutEffect = Effect.tryPromise({
  try: async () => fetch(`${getClientSideURL()}/api/users/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  ,
  catch: (e) => new Error(`Something went wrong ${e}`)
})

// const handleLogout = () => Effect.runPromise(logoutEffect)



export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const handleLogout = () => Effect.runPromise(
    pipe(
      logout(),
      Effect.andThen(Effect.sync(() => {
        router.push('/home')
        return router.refresh()
      }))
    )

  );

  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Aperture className="w-6 h-6" />
          <span className="text-lg font-medium tracking-tight">Yes We Lab</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/home#services" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Services
          </Link>
          <Link href="/home#about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/home#gallery" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Gallery
          </Link>
          <Link href="/home#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/login">Book Now</Link>
          </Button>
          {user &&
            <Button
              onClick={handleLogout}
              variant="outline"
            >
              Logout
            </Button>
          }

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container px-4 py-4 space-y-4">
            <Link
              href="#services"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#about"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#gallery"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#contact"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user &&
              <Link href="/home"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                Logout
              </Link>
            }
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Book Now
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
