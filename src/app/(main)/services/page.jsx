"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Cloud, Database, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Services() {
  const services = [
    {
      icon: <Code size={28} />,
      title: 'Web Development',
      desc: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js. Focus on performance, SEO, and user experience.',
      gradient: 'from-violet-500 to-purple-600',
      features: ['React & Next.js', 'Server-Side Rendering', 'Progressive Web Apps'],
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile Apps',
      desc: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
      gradient: 'from-cyan-400 to-blue-500',
      features: ['Flutter & React Native', 'Offline-first Design', 'Push Notifications'],
    },
    {
      icon: <Brain size={28} />,
      title: 'AI Solutions',
      desc: 'Integrating machine learning models, NLP, and AI-driven analytics into your existing workflows.',
      gradient: 'from-pink-500 to-rose-500',
      features: ['LLM Integration', 'Computer Vision', 'Predictive Analytics'],
    },
    {
      icon: <Cloud size={28} />,
      title: 'SaaS Products',
      desc: 'Architecting scalable, multi-tenant SaaS platforms with robust subscription management.',
      gradient: 'from-emerald-400 to-teal-500',
      features: ['Multi-tenancy', 'Stripe Payments', 'Real-time Features'],
    },
    {
      icon: <Database size={28} />,
      title: 'Cloud Architecture',
      desc: 'Designing and deploying secure, high-availability infrastructure on AWS, Google Cloud, and Azure.',
      gradient: 'from-amber-400 to-orange-500',
      features: ['Auto-scaling', 'Serverless', 'Edge Computing'],
    },
    {
      icon: <Lock size={28} />,
      title: 'Cybersecurity',
      desc: 'Implementing enterprise-grade security protocols, audits, and compliance measures.',
      gradient: 'from-indigo-400 to-violet-500',
      features: ['Penetration Testing', 'SOC2 Compliance', 'Zero Trust'],
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      <div className="absolute inset-0 bg-dots z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="tag-pill"><Code size={14} /> Our Services</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6">
            What We <span className="gradient-text">Build</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Comprehensive technology solutions designed to scale your business and outpace the competition.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bento-card glass p-8 group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed mb-6">{service.desc}</p>
              <div className="space-y-2 mb-6">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground/50">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all duration-300"
              >
                Get Started <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
