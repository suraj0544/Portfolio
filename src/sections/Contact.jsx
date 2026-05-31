import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Send, MapPin, Phone, MessageSquare } from 'lucide-react';
import FloatingBubbles from '../components/FloatingBubbles';

const SP = { type: 'spring', stiffness: 380, damping: 40, mass: 0.8 };

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'surajkumar0544f@gmail.com',
    href:  'mailto:surajkumar0544f@gmail.com',
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    value: 'linkedin.com/in/suraj-kumar-ozha',
    href:  'https://www.linkedin.com/in/suraj-kumar-ozha',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8219596767',
    href:  'tel:+918219596767',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Paonta Sahib, Himachal Pradesh',
    href:  null,
  },
];

export default function Contact() {
  const [focused, setFocused] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    const text = `Hi Suraj,\n\nI am ${name || 'a visitor'} ${email ? `(${email})` : ''}.\n\n*Subject:* ${subject || 'Collaboration Inquiry'}\n\n${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918219596767?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <FloatingBubbles count={12} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SP}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-4 font-mono text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Interested in collaborating or have a security-related inquiry?
            Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* ── Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...SP, delay: 0.08 }}
            className="space-y-5"
          >
            {contactItems.map(({ icon: Icon, label, value, href, external }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...SP, delay: 0.12 + i * 0.07 }}
                className="glass-card p-5 flex items-center gap-5 group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="p-3 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex-shrink-0"
                >
                  <Icon className="w-5 h-5 text-purple-accent" />
                </motion.div>

                <div className="min-w-0">
                  <div className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="text-sm font-medium hover:text-purple-accent
                                 transition-colors duration-250 truncate block"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...SP, delay: 0.15 }}
            className="glass-card p-8"
          >
            <form className="space-y-5" onSubmit={handleWhatsAppSend}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'John Doe'           },
                  { id: 'email', label: 'Email Address',  type: 'email', placeholder: 'john@example.com'   },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="space-y-1.5">
                    <motion.label
                      htmlFor={id}
                      animate={{ color: focused === id ? '#BB66FF' : 'var(--text-muted)' }}
                      transition={{ duration: 0.25 }}
                      className="block text-xs font-mono uppercase tracking-widest"
                    >
                      {label}
                    </motion.label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={formData[id]}
                      onChange={handleChange}
                      onFocus={() => setFocused(id)}
                      onBlur={() => setFocused('')}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <motion.label
                  htmlFor="subject"
                  animate={{ color: focused === 'subject' ? '#BB66FF' : 'var(--text-muted)' }}
                  transition={{ duration: 0.25 }}
                  className="block text-xs font-mono uppercase tracking-widest"
                >
                  Subject
                </motion.label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Security Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                  className="form-input"
                />
              </div>

              <div className="space-y-1.5">
                <motion.label
                  htmlFor="message"
                  animate={{ color: focused === 'message' ? '#BB66FF' : 'var(--text-muted)' }}
                  transition={{ duration: 0.25 }}
                  className="block text-xs font-mono uppercase tracking-widest"
                >
                  Message
                </motion.label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message here…"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  className="form-input resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                className="btn-primary w-full gap-2 justify-center py-3.5"
              >
                Send Secure Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
