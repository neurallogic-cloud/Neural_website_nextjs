"use client";
import React, { useEffect, useState } from 'react';
import { Users, FileText, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../../services/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, contacts: 0, admins: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: blogsCount } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true });
        
        const { count: contactsCount } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true });

        setStats({
          blogs: blogsCount || 0,
          contacts: contactsCount || 0,
          admins: 1
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
           <div className="p-4 bg-primary/20 rounded-xl text-primary"><FileText size={24} /></div>
           <div>
             <p className="text-foreground/60 text-sm">Total Blogs</p>
             <p className="text-2xl font-bold">{stats.blogs}</p>
           </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
           <div className="p-4 bg-cyan-500/20 rounded-xl text-cyan-500"><MessageSquare size={24} /></div>
           <div>
             <p className="text-foreground/60 text-sm">Contact Submissions</p>
             <p className="text-2xl font-bold">{stats.contacts}</p>
           </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
           <div className="p-4 bg-purple-500/20 rounded-xl text-purple-500"><Users size={24} /></div>
           <div>
             <p className="text-foreground/60 text-sm">Active Admins</p>
             <p className="text-2xl font-bold">{stats.admins}</p>
           </div>
        </div>
      </div>
      
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Welcome to the Admin Panel</h2>
        <p className="text-foreground/70 leading-relaxed">
          From here, you can manage the dynamic content of the Neurallogic website. 
          Navigate to the <strong>Blogs</strong> section to create, edit, or delete blog posts.
          All data is synced in real-time with your configured Supabase database.
        </p>
      </div>
    </div>
  );
}
