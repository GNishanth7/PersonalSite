"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Profile" },
  { href: "/journey", label: "Stories" },
  { href: "/missions", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Stories" },
  { href: "/missions", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const themeOptions = [
  { value: "vibrant", label: "Vibrant" },
  { value: "night", label: "Night" },
  { value: "mint", label: "Mint" },
  { value: "sunset", label: "Sunset" },
];

const THEME_STORAGE_KEY = "chronogram-theme";

export default function TopNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "vibrant";
    return localStorage.getItem(THEME_STORAGE_KEY) || "vibrant";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{
          borderColor: "var(--line)",
          background: "color-mix(in srgb, var(--panel) 82%, transparent)",
        }}
      >
        <div className="cc-shell flex items-center justify-between gap-3 py-3">
          <Link href="/" className="font-semibold tracking-tight text-lg whitespace-nowrap">
            chrono<span className="cc-gradient-text">gram</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`cc-chip transition-all ${
                    isActive ? "cc-link-primary text-white border-transparent" : "cc-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <label className="text-xs cc-muted cc-mono sr-only" htmlFor="theme-select">
              Theme
            </label>
            <select
              id="theme-select"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              className="cc-chip cc-mono text-xs cursor-pointer"
              aria-label="Select portfolio theme"
            >
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t px-2 py-2"
        style={{
          borderColor: "var(--line)",
          background: "color-mix(in srgb, var(--panel) 92%, transparent)",
        }}
        aria-label="Mobile navigation"
      >
        <div className="mx-auto max-w-2xl grid grid-cols-4 gap-2">
          {mobileLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-center text-xs py-2 rounded-lg transition-colors ${
                  isActive ? "cc-link-primary text-white" : "cc-subcard cc-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
