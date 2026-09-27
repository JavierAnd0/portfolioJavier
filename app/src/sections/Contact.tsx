import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react';
import { useI18n } from '@/i18n/context';

const Contact = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { id: 'email', icon: Mail, label: t.contact.emailLabel, value: t.contact.emailValue, href: `mailto:${t.contact.emailValue}` },
    { id: 'location', icon: MapPin, label: t.contact.locationLabel, value: t.contact.locationValue, href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/JavierAnd0' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <section id="contact" className="relative min-h-screen w-full bg-black py-24 md:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-xs tracking-[0.3em] text-red mb-2">
            {t.contact.kicker}
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-white/10 uppercase tracking-[0.06em]">
            {t.contact.backdrop}
          </h2>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl md:text-4xl font-normal text-white -mt-8 md:-mt-12 ml-2"
          >
            {t.contact.title.before}
            <span className="text-red">{t.contact.title.accent}</span>
            {t.contact.title.after}
          </motion.h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-white/60 text-lg max-w-2xl"
        >
          {t.contact.intro}
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h4 className="font-display text-2xl md:text-3xl font-normal text-white mb-4">
                {t.contact.pitch.before}
                <span className="text-gradient">{t.contact.pitch.accent}</span>
                {t.contact.pitch.after}
              </h4>
              <p className="text-white/60 leading-relaxed">
                {t.contact.body}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 border-2 border-white/15 hover:border-red cut-corners transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-red/20 flex items-center justify-center group-hover:bg-red cut-corner-tag transition-colors">
                    <item.icon className="w-5 h-5 text-red group-hover:text-black transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-mono">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-white/50 mb-4 font-mono tracking-wide">{t.contact.follow}</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3, rotate: -4 }}
                    className="w-12 h-12 border-2 border-white/20 cut-corners flex items-center justify-center text-white/60 hover:text-black hover:bg-red hover:border-red transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 border-2 border-red cut-corners p-6 md:p-8 bg-dark-grey/40">
              <p className="font-hand text-red text-sm tracking-wide -mt-2 mb-2">
                {t.contact.formHint}
              </p>
              {/* Name Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'name' || formData.name ? -24 : 0,
                    scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    color: focusedField === 'name' ? '#ff0022' : 'rgba(255,255,255,0.5)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 text-white/50 pointer-events-none origin-left font-mono text-sm"
                >
                  {t.contact.name}
                </motion.label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-black border-2 border-white/20 text-white focus:border-red focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'email' || formData.email ? -24 : 0,
                    scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    color: focusedField === 'email' ? '#ff0022' : 'rgba(255,255,255,0.5)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 text-white/50 pointer-events-none origin-left font-mono text-sm"
                >
                  {t.contact.email}
                </motion.label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-black border-2 border-white/20 text-white focus:border-red focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'message' || formData.message ? -24 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    color: focusedField === 'message' ? '#ff0022' : 'rgba(255,255,255,0.5)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 text-white/50 pointer-events-none origin-left font-mono text-sm"
                >
                  {t.contact.message}
                </motion.label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-black border-2 border-white/20 text-white focus:border-red focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                className={`w-full py-4 cut-corners font-display tracking-wide flex items-center justify-center gap-3 transition-all duration-300 border-2 border-black ${
                  isSubmitted
                    ? 'bg-green-500 text-black'
                    : 'bg-red text-black hover:bg-white'
                }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.contact.sent}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.contact.send}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 halftone opacity-10 -z-10" />
    </section>
  );
};

export default Contact;
