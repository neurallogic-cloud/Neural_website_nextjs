"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Plus, Edit2, Trash2, Loader2, X, Briefcase } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', department: '', location: '', type: '', description: '' });
  const [saving, setSaving] = useState(false);

  const fetchCareers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setCareers(data);
    } else {
      console.error('Error fetching careers:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (formData.id) {
        // Update
        const { error } = await supabase.from('careers').update({
          title: formData.title,
          department: formData.department,
          location: formData.location,
          type: formData.type,
          description: formData.description
        }).eq('id', formData.id);
        
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('careers').insert([{
          title: formData.title,
          department: formData.department,
          location: formData.location,
          type: formData.type,
          description: formData.description
        }]);
        
        if (error) throw error;
      }
      setIsEditing(false);
      setFormData({ id: null, title: '', department: '', location: '', type: '', description: '' });
      fetchCareers();
    } catch (error) {
      console.error("Error saving career:", error);
      alert("Failed to save job post. Ensure the table has the correct columns (title, department, location, type, description).");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (career) => {
    setFormData({
      id: career.id,
      title: career.title || '',
      department: career.department || '',
      location: career.location || '',
      type: career.type || '',
      description: career.description || ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      const { error } = await supabase.from('careers').delete().eq('id', id);
      if (error) {
        console.error("Error deleting career:", error);
      } else {
        fetchCareers();
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Postings</h1>
        <button
          onClick={() => {
            setFormData({ id: null, title: '', department: '', location: '', type: '', description: '' });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          <span>New Job</span>
        </button>
      </div>

      {isEditing ? (
        <div className="glass p-6 md:p-8 rounded-2xl mb-8 border border-primary/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{formData.id ? 'Edit Job Post' : 'Create New Job'}</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <input
                  type="text"
                  required
                  list="departments"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Engineering"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  required
                  list="locations"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Remote / New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <input
                  type="text"
                  required
                  list="job-types"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Full-time"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
                placeholder="Write the job description here..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl border border-border hover:bg-foreground/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? <Loader2 size={20} className="animate-spin" /> : null}
                <span>{saving ? 'Saving...' : 'Save Job Post'}</span>
              </button>
            </div>

            {/* Datalists for dropdowns with custom input support */}
            <datalist id="departments">
              <option value="Engineering" />
              <option value="Design" />
              <option value="Marketing" />
              <option value="Sales" />
              <option value="HR" />
              <option value="Operations" />
            </datalist>
            
            <datalist id="locations">
              <option value="Remote" />
              <option value="Hybrid" />
              <option value="On-site" />
              <option value="New York" />
              <option value="San Francisco" />
              <option value="London" />
            </datalist>

            <datalist id="job-types">
              <option value="Full-time" />
              <option value="Part-time" />
              <option value="Contract" />
              <option value="Internship" />
              <option value="Freelance" />
            </datalist>
          </form>
        </div>
      ) : null}

      {careers.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl">
          <Briefcase size={48} className="mx-auto mb-4 text-primary/50" />
          <h3 className="text-xl font-bold mb-2">No job postings yet</h3>
          <p className="text-foreground/60 mb-6">Create your first job posting to attract talent.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Create Job Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div key={career.id} className="glass p-6 rounded-2xl group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-xs font-semibold">
                  {career.department}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(career)}
                    className="p-2 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(career.id)}
                    className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{career.title}</h3>
              <div className="flex flex-wrap gap-2 text-xs text-foreground/60 mb-4">
                <span className="flex items-center gap-1 bg-foreground/5 px-2 py-1 rounded">
                   {career.location}
                </span>
                <span className="flex items-center gap-1 bg-foreground/5 px-2 py-1 rounded">
                   {career.type}
                </span>
              </div>
              <div className="text-foreground/70 text-sm line-clamp-3 mt-auto markdown-preview">
                <ReactMarkdown>{career.description}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
