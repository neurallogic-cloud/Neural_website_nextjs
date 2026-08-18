"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Code2, Brain, Cpu, Globe, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const services = [
    {
      icon: <Code2 size={24} />,
      title: 'Web Development',
      desc: 'Scalable React & Node.js applications built for performance.',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: <Brain size={24} />,
      title: 'AI & Machine Learning',
      desc: 'Intelligent systems and LLM integrations for your business.',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Cloud Infrastructure',
      desc: 'Distributed, low-latency solutions at the network edge.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: <Globe size={24} />,
      title: 'End-to-End SaaS',
      desc: 'Complete architecture for subscription-based products.',
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '3x', label: 'Faster Deployments' },
    { value: '24/7', label: 'Support Available' },
  ];

  const techStack = ['React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'Supabase', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'TensorFlow', 'PostgreSQL'];

  return (
    <div className="overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-grid z-0" />
        <div className="orb orb-primary w-[500px] h-[500px] top-[-10%] right-[-10%]" />
        <div className="orb orb-secondary w-[400px] h-[400px] bottom-[10%] left-[-5%]" />
        <div className="orb orb-accent w-[300px] h-[300px] top-[40%] right-[20%]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <div className="tag-pill">
                <Sparkles size={14} />
                <span>AI-First Software Agency</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
            >
              Think{' '}
              <span className="gradient-text">Neural</span>
              <br />
              Solve{' '}
              <span className="gradient-text-alt">Logic</span>
              <span className="text-primary">.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              We engineer intelligent, beautifully designed digital solutions — from complex
              SaaS architectures to AI integrations that power the future.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-base hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-primary/25 hover:shadow-primary/40"
              >
                Start Your Project
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/portfolio"
                className="group px-8 py-4 glass rounded-2xl font-semibold text-base hover:bg-foreground/5 transition-all duration-300 flex items-center gap-2"
              >
                Explore Our Work
                <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={fadeUp}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-3xl mx-auto"
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{value}</div>
                  <div className="text-xs text-foreground/50 font-medium uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== TECH MARQUEE ===== */}
      <section className="py-8 border-y border-border/50 bg-card/30 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="mx-8 text-sm font-mono text-foreground/30 font-medium uppercase tracking-widest">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ===== SERVICES BENTO GRID ===== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="tag-pill">
                <Zap size={14} />
                What We Do
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
              Solutions That <span className="gradient-text">Scale</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto">
              End-to-end technology solutions engineered with modern stacks, built for the demands of tomorrow.
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="bento-card glass p-8 md:p-10 group cursor-pointer"
              >
                {/* Icon gradient bg */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed mb-6">{service.desc}</p>
                <Link href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY NEURALLOGIC ===== */}
      <section className="py-24 md:py-32 bg-card/50 border-y border-border/50 relative">
        <div className="absolute inset-0 bg-dots z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left */}
            <div>
              <motion.div variants={fadeUp} className="mb-4">
                <span className="tag-pill">
                  <Shield size={14} />
                  Why Choose Us
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
                Engineering <span className="gradient-text">excellence</span>, delivered.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-foreground/60 mb-10 leading-relaxed">
                We don't just write code — we architect systems that scale, perform, and delight users. Every project is a partnership built on transparency and technical precision.
              </motion.p>

              <motion.div variants={stagger} className="space-y-5">
                {[
                  { icon: <BarChart3 size={20} />, title: 'Performance Obsessed', desc: 'Sub-second load times with optimized rendering pipelines.' },
                  { icon: <Shield size={20} />, title: 'Security First', desc: 'Enterprise-grade security protocols baked into every layer.' },
                  { icon: <Zap size={20} />, title: 'Rapid Iteration', desc: 'CI/CD pipelines and agile workflows for continuous delivery.' },
                ].map(({ icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-foreground/3 transition-colors duration-300"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{title}</h4>
                      <p className="text-sm text-foreground/55">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — Code Block Visual */}
            <motion.div variants={scaleIn} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-3xl" />
              <div className="relative glass rounded-3xl p-6 md:p-8 overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs font-mono text-foreground/40">neurallogic.config.ts</span>
                </div>
                {/* Code content */}
                <pre className="font-mono text-sm leading-7 overflow-x-auto">
                  <code>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-400">config</span>{' '}
                    <span className="text-foreground/50">=</span>{' '}
                    <span className="text-yellow-400">{'{'}</span>{'\n'}
                    {'  '}<span className="text-foreground/60">stack</span>
                    <span className="text-foreground/40">:</span>{' '}
                    <span className="text-green-400">"React + Node.js"</span>
                    <span className="text-foreground/40">,</span>{'\n'}
                    {'  '}<span className="text-foreground/60">ai</span>
                    <span className="text-foreground/40">:</span>{' '}
                    <span className="text-green-400">"LLM Integrations"</span>
                    <span className="text-foreground/40">,</span>{'\n'}
                    {'  '}<span className="text-foreground/60">cloud</span>
                    <span className="text-foreground/40">:</span>{' '}
                    <span className="text-green-400">"AWS + Edge"</span>
                    <span className="text-foreground/40">,</span>{'\n'}
                    {'  '}<span className="text-foreground/60">uptime</span>
                    <span className="text-foreground/40">:</span>{' '}
                    <span className="text-cyan-400">99.99</span>
                    <span className="text-foreground/40">,</span>{'\n'}
                    {'  '}<span className="text-foreground/60">scale</span>
                    <span className="text-foreground/40">:</span>{' '}
                    <span className="text-purple-400">Infinity</span>
                    <span className="text-foreground/40">,</span>{'\n'}
                    <span className="text-yellow-400">{'}'}</span>
                    <span className="text-foreground/40">;</span>
                  </code>
                </pre>
                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="tag-pill">
                <Star size={14} />
                Testimonials
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">teams</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                text: "Neurallogic completely transformed our edge infrastructure. Their AI integrations reduced our latency by 80% and scaled flawlessly.",
                name: "Sarah Jenkins",
                role: "CTO, QuantumTech",
              },
              {
                text: "The most impressive engineering team we've worked with. They delivered a complex SaaS platform months ahead of schedule.",
                name: "David Chen",
                role: "Founder, NovaData",
              },
              {
                text: "Their approach to predictive analytics gave us insights we never thought possible. A truly reliable partner.",
                name: "Elena Rodriguez",
                role: "VP Engineering, SynthCorp",
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bento-card glass p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/70 leading-relaxed mb-8 flex-1 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{review.name}</h4>
                    <p className="text-xs text-foreground/50">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="relative glass rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/15 rounded-full blur-[80px]" />

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
              Ready to build something{' '}
              <span className="gradient-text">extraordinary</span>?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 mb-10 max-w-xl mx-auto relative z-10">
              Let's turn your vision into a scalable, beautiful product.
              Start the conversation today.
            </motion.p>
            <motion.div variants={fadeUp} className="relative z-10">
              <Link href="/contact"
                className="group inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40"
              >
                Get in Touch
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
