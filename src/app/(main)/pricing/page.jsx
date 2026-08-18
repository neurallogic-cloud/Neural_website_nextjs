"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$999',
      period: '/project',
      desc: 'Perfect for small businesses needing a solid online presence.',
      features: ['Responsive Website (up to 5 pages)', 'Basic SEO Setup', 'Contact Form Integration', '1 Month Support', 'Standard Delivery (2 weeks)'],
      isPopular: false,
      gradient: '',
    },
    {
      name: 'Professional',
      price: '$3,499',
      period: '/project',
      desc: 'Ideal for growing companies needing custom web apps.',
      features: ['Custom Web App (React/Node.js)', 'Advanced SEO & Analytics', 'Database Integration', '3 Months Support', 'Priority Delivery (4 weeks)'],
      isPopular: true,
      gradient: 'from-primary to-accent',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For large organizations requiring scalable architecture.',
      features: ['Full-stack SaaS Architecture', 'AI/ML Integrations', 'Dedicated Cloud Infrastructure', '24/7 SLA Support', 'Continuous Integration / Delivery'],
      isPopular: false,
      gradient: '',
    },
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
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="tag-pill"><Zap size={14} /> Pricing</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Choose the right plan for your business. No hidden fees, no surprises.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative bento-card p-8 md:p-10 flex flex-col ${
                plan.isPopular
                  ? 'glass glow-primary md:-translate-y-4'
                  : 'glass'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-foreground/55 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl md:text-5xl font-bold ${plan.isPopular ? 'gradient-text' : ''}`}>
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-foreground/40 text-sm font-medium">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-primary shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact"
                className={`w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.isPopular
                    ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20'
                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                }`}
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
