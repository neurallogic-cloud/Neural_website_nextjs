"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '../../../services/supabase';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const MOCK_BLOGS = [
  {
    id: '1',
    title: 'The Future of AI in SaaS Applications',
    content: 'Artificial Intelligence is revolutionizing how we build and interact with Software as a Service...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Building Scalable Architectures with Supabase',
    content: 'When it comes to modern backend-as-a-service providers, Supabase stands out for its...',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Why React and Vite are the Perfect Match',
    content: 'Vite has fundamentally changed the frontend developer experience by providing lightning-fast...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error || !data || data.length === 0) {
          setBlogs(MOCK_BLOGS);
        } else {
          setBlogs(data);
        }
      } catch (err) {
        setBlogs(MOCK_BLOGS);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      <div className="absolute inset-0 bg-dots z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="tag-pill"><BookOpen size={14} /> Blog</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6">
            Insights & <span className="gradient-text">Ideas</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Thought leadership, tutorials, and deep dives from our engineering and design teams.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass rounded-2xl h-[380px] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={fadeUp}
                className="bento-card glass overflow-hidden group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={blog.image || 'https://via.placeholder.com/800x400'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs font-mono text-foreground/40 mb-3 gap-1.5">
                    <Calendar size={12} />
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {blog.title}
                  </h2>
                  <p className="text-foreground/55 text-sm mb-6 line-clamp-3 flex-1">{blog.content}</p>
                  <Link href={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all duration-300 mt-auto w-fit"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
