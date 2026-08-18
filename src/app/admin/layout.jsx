"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../../services/supabase';
import { LayoutDashboard, FileText, LogOut, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AdminLayout({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!session && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.replace('/admin');
      }
    }
  }, [session, loading, pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  if (pathname === '/admin/login') {
    return children;
  }

  const links = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-primary">Admin</span>Panel
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm",
                pathname === link.path ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-foreground/5 p-8 relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none mix-blend-screen" />
        <div className="relative z-10 max-w-5xl mx-auto glass p-8 rounded-2xl">
           {children}
        </div>
      </main>
    </div>
  );
}
