"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Users } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Careers() {
  const jobs = [
    { title: 'Senior Full-Stack Engineer', location: 'Remote', type: 'Full-time', dept: 'Engineering' },
    { title: 'UX/UI Designer', location: 'San Francisco, CA', type: 'Full-time', dept: 'Design' },
    { title: 'AI Solutions Architect', location: 'Remote', type: 'Full-time', dept: 'Engineering' },
    { title: 'Product Marketing Manager', location: 'New York, NY', type: 'Full-time', dept: 'Marketing' },
  ];

  const benefits = [
    'Competitive compensation and equity',
    'Remote-first culture with flexible hours',
    'Comprehensive health, dental, and vision insurance',
    'Unlimited PTO and paid sabbaticals',
    'Annual learning and development stipend',
    'Home office setup allowance',
  ];

  const deptGradients = {
    Engineering: 'from-violet-500 to-purple-600',
    Design: 'from-cyan-400 to-blue-500',
    Marketing: 'from-pink-500 to-rose-500',
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="tag-pill"><Users size={14} /> Careers</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Join the <span className="gradient-text">Neurallogic</span> Team
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto mb-10">
            We're always looking for passionate, logical thinkers to help us build the future of software.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="#open-roles"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              View Open Roles
              <Briefcase size={18} className="transition-transform duration-300 group-hover:rotate-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Why Work With Us */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center"
        >
          <div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6">
              Why <span className="gradient-text-alt">work</span> with us?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/60 leading-relaxed mb-8">
              At Neurallogic, we believe the best work happens when talented people are given the
              autonomy and resources to solve hard problems.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/3 transition-colors"
                >
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-foreground/70">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden bento-card">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="h-56 rounded-2xl overflow-hidden bento-card">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" alt="Discussion" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-56 rounded-2xl overflow-hidden bento-card">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600" alt="Remote work" className="w-full h-full object-cover" />
              </div>
              <div className="h-44 rounded-2xl glass flex flex-col justify-center items-center text-center p-6">
                <span className="text-4xl font-bold gradient-text mb-2">4.9/5</span>
                <span className="text-xs text-foreground/50 font-mono uppercase tracking-wider">Rating on Glassdoor</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Open Roles */}
        <div id="open-roles" className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Open Positions</h2>
                <p className="text-foreground/55 text-sm">Find your next opportunity at Neurallogic.</p>
              </div>
            </motion.div>

            <motion.div variants={stagger} className="space-y-4">
              {jobs.map((job, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bento-card glass p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  <div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/50">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${deptGradients[job.dept] || 'from-gray-400 to-gray-500'}`}>
                        {job.dept}
                      </span>
                    </div>
                  </div>
                  <Link href="/contact"
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold bg-foreground/5 hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary transition-all duration-300"
                  >
                    Apply Now <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Fallback CTA */}
            <motion.div
              variants={fadeUp}
              className="mt-12 text-center glass rounded-3xl p-10 border border-dashed border-primary/20"
            >
              <h3 className="text-xl font-bold mb-2">Don't see a fit?</h3>
              <p className="text-foreground/55 text-sm mb-6">We're always looking for talented people. Send us your resume.</p>
              <Link href="/contact" className="text-primary font-semibold hover:underline text-sm">hello@neurallogic.com</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
