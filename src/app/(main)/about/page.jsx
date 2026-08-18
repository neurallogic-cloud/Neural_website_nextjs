"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function About() {
  const milestones = [
    { year: '2023', text: 'Neurallogic founded with a vision to redefine digital products.' },
    { year: '2024', text: 'Expanded team and delivered 20+ successful enterprise projects.' },
    { year: '2025', text: 'Launched proprietary AI solutions for SMBs.' },
    { year: '2026', text: 'Recognized as an industry leader in modern SaaS architecture.' },
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
            <span className="tag-pill"><Target size={14} /> About Us</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6">
            Building the <span className="gradient-text">Future</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We are a forward-thinking technology company specializing in innovative, scalable software solutions.
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text-alt">Mission</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/65 leading-relaxed mb-6">
              To empower businesses by bridging the gap between complex logic and seamless user experiences.
              We believe technology should be intuitive, scalable, and beautiful.
            </motion.p>
            <motion.p variants={fadeUp} className="text-foreground/65 leading-relaxed">
              Whether you are a startup building your first MVP or an enterprise modernizing your infrastructure,
              we have the expertise to deliver beyond expectations.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl p-12 flex items-center justify-center aspect-square">
              <img
                src={`/logo_Neurallogic.png`}
                alt="Neurallogic Logo"
                className="w-3/4 h-auto object-contain drop-shadow-2xl animate-float"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="tag-pill"><Rocket size={14} /> Our Journey</span>
          </motion.div>

          <motion.div variants={stagger} className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-6 group">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-mono font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6 flex-1 group-hover:border-primary/30 transition-colors duration-300">
                    <span className="text-xs font-mono text-primary font-semibold mb-2 block">{m.year}</span>
                    <p className="text-foreground/70 text-sm leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
