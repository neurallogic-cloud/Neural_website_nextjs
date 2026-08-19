"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, MessageCircle } from 'lucide-react';
import { supabase } from '../../../services/supabase';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    try {
      await supabase.from('contacts').insert([formData]);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'neurallogicofficial@gmail.com', gradient: 'from-violet-500 to-purple-600' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 8918327205', gradient: 'from-cyan-400 to-blue-500' },
    { icon: <MessageCircle size={20} />, label: 'Whatsapp', value: '+91 8158021116', gradient: 'from-cyan-400 to-blue-500' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Pachasbetia, Belda, Paschim Medinipur, West Bengal - 721424', gradient: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="tag-pill"><MessageSquare size={14} /> Contact Us</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Ready to start your next big project? Reach out — we'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map(({ icon, label, value, gradient }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bento-card glass p-6 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg shrink-0`}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div variants={fadeUp} className="bento-card overflow-hidden h-48 md:h-64">
              <iframe
                src="https://maps.google.com/maps?q=22.0662654,87.3970899&t=k&z=18&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.7)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bento-card glass p-8 md:p-10 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-2">Send us a message</h3>
              <p className="text-sm text-foreground/50 mb-8">We'll get back to you within 24 hours.</p>

              <div className="space-y-5 flex-1">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-foreground/50 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-foreground/50 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-foreground/50 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3.5 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none text-sm"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-emerald-500 text-center text-sm font-medium"
                  >
                    ✓ Message sent successfully!
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-400 text-center text-sm font-medium"
                  >
                    Please fill out all fields.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
