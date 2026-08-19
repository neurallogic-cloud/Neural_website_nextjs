"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Loader2, Mail, Calendar, User, MessageSquare } from 'lucide-react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setContacts(data);
    } else {
      console.error('Error fetching contacts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <div className="bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold">
          Total: {contacts.length}
        </div>
      </div>
      
      {contacts.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl">
          <p className="text-foreground/60 text-lg">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="glass p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    {contact.name || 'Anonymous'}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Mail size={14} />
                      <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(contact.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-background/50 rounded-xl border border-border/50">
                <div className="flex items-start gap-2 text-foreground/80">
                  <MessageSquare size={16} className="mt-1 shrink-0 text-primary" />
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">
                    {contact.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
