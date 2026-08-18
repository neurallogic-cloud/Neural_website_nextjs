"use client";
import React from 'react';
import { Users, FileText, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
           <div className="p-4 bg-primary/20 rounded-xl text-primary"><FileText size={24} /></div>
           <div>
             <p className="text-foreground/60 text-sm">Total Blogs</p>
             <p className="text-2xl font-bold">Manage Content</p>
           </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
           <div className="p-4 bg-cyan-500/20 rounded-xl text-cyan-500"><MessageSquare size={24} /></div>
           <div>
             <p className="text-foreground/60 text-sm">Contact Submissions</p>
             <p className="text-2xl font-bold">Check Supabase</p>
           </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
           <div className="p-4 bg-purple-500/20 rounded-xl text-purple-500"><Users size={24} /></div>
           <div>
             <p className="text-foreground/60 text-sm">Active Admins</p>
             <p className="text-2xl font-bold">1</p>
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
