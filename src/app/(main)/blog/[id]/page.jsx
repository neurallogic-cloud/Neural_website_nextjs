"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '../../../../services/supabase';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const MOCK_BLOGS = [
  {
    id: '1',
    title: 'The Future of AI in SaaS Applications',
    content: 'Artificial Intelligence is revolutionizing how we build and interact with Software as a Service. From predictive analytics to automated customer support, the integration of AI models like LLMs is becoming a standard rather than a luxury.\n\nIn this article, we explore the architecture required to support these integrations at scale. We will look at vector databases, efficient prompt engineering, and how to maintain data privacy while leveraging third-party AI APIs.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    created_at: new Date().toISOString(),
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        if (error || !data) {
          const mockBlog = MOCK_BLOGS.find(b => b.id === id) || MOCK_BLOGS[0];
          setBlog(mockBlog);
        } else {
          setBlog(data);
        }
      } catch (err) {
        const mockBlog = MOCK_BLOGS.find(b => b.id === id) || MOCK_BLOGS[0];
        setBlog(mockBlog);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-foreground/60">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      <div className="absolute inset-0 bg-dots z-0 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back */}
        <Link href="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs font-mono text-foreground/40 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              5 min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-10 leading-tight tracking-tight">{blog.title}</h1>

          {/* Hero Image */}
          <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden mb-12 bento-card">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="prose-custom">
            {blog.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}
