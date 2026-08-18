import React from 'react';
import Link from 'next/link';
import { MessageCircle, Globe, Code, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: 'Web Development', to: '/services' },
      { label: 'Mobile Apps', to: '/services' },
      { label: 'AI Solutions', to: '/services' },
      { label: 'SaaS Products', to: '/services' },
      { label: 'Cloud Architecture', to: '/services' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
    Resources: [
      { label: 'Documentation', to: '#' },
      { label: 'API Reference', to: '#' },
      { label: 'Status Page', to: '#' },
      { label: 'Support', to: '/contact' },
    ],
  };

  return (
    <footer className="relative mt-auto border-t border-border/50 bg-card/50">
      {/* Gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo_Neurallogic-removebg.png"
                alt="Neurallogic"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-sm mb-8">
              Think Neural. Solve Logic. We engineer intelligent, beautifully designed
              digital solutions for startups, enterprises, and everything in between.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <MessageCircle size={16} />, href: '#', label: 'Social' },
                { icon: <Globe size={16} />, href: '#', label: 'Website' },
                { icon: <Code size={16} />, href: '#', label: 'GitHub' },
                { icon: <Mail size={16} />, href: 'mailto:hello@neurallogic.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      href={to}
                      className="text-sm text-foreground/55 hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/40 font-mono">
            © {currentYear} Neurallogic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-foreground/40 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-foreground/40 hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
