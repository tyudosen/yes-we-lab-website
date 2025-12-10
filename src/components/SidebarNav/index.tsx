"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utilities/ui"

const navSections = [
  {
    items: [{ href: "/manifesto", label: "Manifesto", requiresAuth: false }],
  },
  {
    items: [
      { href: "/servizi", label: "Servizi", requiresAuth: false },
      { href: "/costi", label: "Costi", requiresAuth: false },
      { href: "/ribbons", label: "Ribbons", requiresAuth: true },
      { href: "/news", label: "News/Blog", requiresAuth: false },
    ],
  },
  {
    items: [
      { href: "/community", label: "Community", requiresAuth: true },
      { href: "/media", label: "Media", requiresAuth: true },
    ],
  },
  {
    items: [{ href: "/contatti", label: "Contatti", requiresAuth: false }],
  },
]

function useAuth() {
  // TODO: Replace with actual auth implementation (e.g., Supabase, NextAuth)
  const [isLoggedIn] = useState(false)
  return { isLoggedIn }
}

function Logo() {
  return (
    <Link href='/'>
      <div className="flex flex-col items-center py-6 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary/10">
            <span className="font-mono text-xs font-bold text-primary">YWL</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xl font-bold tracking-tight text-foreground">
              Yes<span className="text-primary">We</span>Lab
            </span>
            <span className="text-xs text-muted-foreground tracking-widest text-right">APS</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-6 py-3 text-sm font-mono tracking-wide transition-colors text-center",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  )
}

export function SidebarNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn } = useAuth()

  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.requiresAuth || isLoggedIn),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 bg-background">
        <Logo />

        {/* Navigation Links with dividers */}
        <nav className="flex-1">
          {filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mx-4 border-t border-border" />
              <div className="py-2">
                {section.items.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {!isLoggedIn && (
          <div className="p-4 border-t border-border">
            <Link
              href="/login"
              className="block px-6 py-3 text-sm font-mono tracking-wide text-center text-muted-foreground hover:text-primary transition-colors"
            >
              Accedi
            </Link>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-background px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-primary bg-primary/10">
            <span className="font-mono text-[10px] font-bold text-primary">YWL</span>
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            Yes<span className="text-primary">We</span>Lab
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-56 bg-background transform transition-transform duration-200 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Logo />

        <nav>
          {filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mx-4 border-t border-border" />
              <div className="py-2">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {!isLoggedIn && (
          <div className="p-4 border-t border-border">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-3 text-sm font-mono tracking-wide text-center text-muted-foreground hover:text-primary transition-colors"
            >
              Accedi
            </Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pl-56">
        <div className="pt-14 md:pt-0">{children}</div>
      </main>
    </div>
  )
}

