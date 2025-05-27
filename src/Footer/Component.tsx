// import { getCachedGlobal } from '@/utilities/getGlobals'
// import Link from 'next/link'
// import React from 'react'
//
// import type { Footer } from '@/payload-types'
//
// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
// import { CMSLink } from '@/components/Link'
// import { Logo } from '@/components/Logo/Logo'
//
// export async function Footer() {
//   const footerData: Footer = await getCachedGlobal('footer', 1)()
//
//   const navItems = footerData?.navItems || []
//
//   return (
//     <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
//       <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
//         <Link className="flex items-center" href="/">
//           <Logo />
//         </Link>
//
//         <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
//           <ThemeSelector />
//           <nav className="flex flex-col md:flex-row gap-4">
//             {navItems.map(({ link }, i) => {
//               return <CMSLink className="text-white" key={i} {...link} />
//             })}
//           </nav>
//         </div>
//       </div>
//     </footer>
//   )
// }
import Link from "next/link"
import { Aperture } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Aperture className="w-5 h-5" />
          <span className="text-sm font-medium">Yes We Lab</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#services" className="text-xs text-muted-foreground hover:text-foreground">
            Services
          </Link>
          <Link href="#about" className="text-xs text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="#gallery" className="text-xs text-muted-foreground hover:text-foreground">
            Gallery
          </Link>
          <Link href="#contact" className="text-xs text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Yes We Lab. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

