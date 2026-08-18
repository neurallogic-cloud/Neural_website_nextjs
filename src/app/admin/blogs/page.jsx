"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', content: '', image: '' });
  const [saving, setSaving] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (formData.id) {
      // Update
      await supabase.from('blogs').update({
        title: formData.title,
        content: formData.content,
        image: formData.image
      }).eq('id', formData.id);
    } else {
      // Insert
      await supabase.from('blogs').insert([{
        title: formData.title,
        content: formData.content,
        image: formData.image
      }]);
    }
    setSaving(false);
    setIsEditing(false);
    setFormData({ id: null, title: '', content: '', image: '' });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      await supabase.from('blogs').delete().eq('id', id);
      fetchBlogs();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        {!isEditing && (
          <button 
            onClick={() => { setFormData({ id: null, title: '', content: '', image: '' }); setIsEditing(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} /> New Blog
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="glass p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{formData.id ? 'Edit Blog' : 'Create New Blog'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-foreground/60 hover:text-foreground"><X size={24} /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-black/20 border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Image URL</label>
              <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 bg-black/20 border border-border rounded-lg focus:outline-none focus:border-primary" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Content</label>
              <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 bg-black/20 border border-border rounded-lg focus:outline-none focus:border-primary"></textarea>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-foreground/5">Cancel</button>
              <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2">
                {saving ? <Loader2 className="animate-spin" size={16} /> : 'Save Post'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden border border-border">
          {loading ? (
             <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
          ) : blogs.length === 0 ? (
             <div className="p-8 text-center text-foreground/60">No blogs found. Create one!</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-black/20">
                  <th className="p-4 font-medium text-foreground/80">Title</th>
                  <th className="p-4 font-medium text-foreground/80">Date</th>
                  <th className="p-4 font-medium text-foreground/80 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{blog.title}</td>
                    <td className="p-4 text-sm text-foreground/60">{new Date(blog.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEdit(blog)} className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors inline-flex"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors inline-flex"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
