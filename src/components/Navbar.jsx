"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const isCompanyActive = ['/about', '/careers', '/contact'].some(route => pathname.startsWith(route));

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        scrolled
          ? "glass-strong shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo_Neurallogic-removebg.png"
              alt="Neurallogic"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services' },
              { to: '/portfolio', label: 'Work' },
              { to: '/pricing', label: 'Pricing' },
              { to: '/blog', label: 'Blog' },
            ].map(({ to, label }) => {
              const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
              return (
                <Link key={to} href={to} className="relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full group/link">
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-foreground/5 dark:bg-foreground/10 rounded-full -z-10 border border-foreground/10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={cn("relative z-10", isActive ? "text-foreground font-semibold" : "text-foreground/70 group-hover/link:text-foreground")}>
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* Company Dropdown */}
            <div className="relative group/company z-10">
              <button className={cn(
                "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full flex items-center gap-1",
                isCompanyActive ? "text-foreground font-semibold" : "text-foreground/70 group-hover/company:text-foreground"
              )}>
                {isCompanyActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-foreground/5 dark:bg-foreground/10 rounded-full -z-10 border border-foreground/10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Company</span>
                <ChevronDown size={14} className="relative z-10 transition-transform duration-300 group-hover/company:rotate-180" />
              </button>
              <div className="absolute right-0 mt-0 w-52 pt-2 opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-300 transform -translate-y-2 group-hover/company:translate-y-0">
                <div className="glass-strong rounded-2xl overflow-hidden shadow-xl">
                  <div className="py-2">
                    {[
                      { to: '/about', label: 'About Us' },
                      { to: '/careers', label: 'Careers' },
                      { to: '/contact', label: 'Contact' },
                    ].map(({ to, label }) => {
                      const isSubActive = pathname === to || pathname.startsWith(to);
                      return (
                        <Link
                          key={to}
                          href={to}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-all rounded-xl",
                            isSubActive 
                              ? "bg-foreground/5 dark:bg-foreground/10 text-foreground font-semibold shadow-sm border border-foreground/5" 
                              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                          )}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-border mx-2" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-between w-14 h-7 rounded-full bg-foreground/10 p-1 transition-colors duration-300 shadow-inner"
              aria-label="Toggle Theme"
            >
              <div className="absolute inset-0 z-0 flex justify-between items-center px-1.5 pointer-events-none">
                <Moon size={14} className="text-foreground/40" />
                <Sun size={14} className="text-foreground/40" />
              </div>
              <motion.div
                className="relative z-10 w-5 h-5 rounded-full bg-background shadow-md flex items-center justify-center border border-border/50"
                animate={{ x: theme === 'dark' ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {theme === 'dark' ? <Sun size={12} className="text-yellow-500" /> : <Moon size={12} className="text-foreground/80" />}
              </motion.div>
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-between w-12 h-6 rounded-full bg-foreground/10 p-1 transition-colors shadow-inner"
              aria-label="Toggle Theme"
            >
              <div className="absolute inset-0 z-0 flex justify-between items-center px-1 pointer-events-none">
                <Moon size={12} className="text-foreground/40" />
                <Sun size={12} className="text-foreground/40" />
              </div>
              <motion.div
                className="relative z-10 w-4 h-4 rounded-full bg-background shadow-md flex items-center justify-center border border-border/50"
                animate={{ x: theme === 'dark' ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {theme === 'dark' ? <Sun size={10} className="text-yellow-500" /> : <Moon size={10} className="text-foreground/80" />}
              </motion.div>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-foreground/5 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-strong border-t border-border/50"
          >
            <div className="px-4 pt-3 pb-4 flex flex-col gap-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/portfolio', label: 'Work' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/blog', label: 'Blog' },
                { to: '/careers', label: 'Careers' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => {
                const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
                return (
                  <Link
                    key={to}
                    href={to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive ? "bg-foreground/5 dark:bg-foreground/10 text-foreground font-semibold" : "text-foreground/70 hover:bg-foreground/5"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold text-center"
              >
                Start a Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
