import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Copy, Check, AlertCircle, RotateCcw, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/persona/SectionHeading';
import { useI18n } from '@/i18n/context';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { t } = useI18n();

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Anti-spam: when the form was shown (bots submit instantly) and a hidden
  // honeypot field that only bots fill in. Both are checked by api/_spam.ts.
  const startedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSimulated, setIsSimulated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.contact.emailValue);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL || '/api/send';
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'Nueva Solicitud de Contacto',
        message: formData.message.trim(),
        website: honeypotRef.current?.value ?? '',
        startedAt: startedAt.current,
      };

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo enviar la solicitud. Intenta nuevamente.');
      }

      setIsSimulated(Boolean(data.simulated));
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      startedAt.current = Date.now();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de conexión al enviar el correo.';
      setErrorMessage(msg);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/JavierAnd0' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/javier-andrade-longas' },
  ];

  const inputBaseClass =
    'w-full border-2 border-white/25 bg-[#121212] px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-white focus:bg-black focus:shadow-[4px_4px_0_#e60012] focus:outline-none';

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      {/* Subtle diagonal red graphic slash in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[42%] bg-[#e60012]/[0.06] lg:block"
        style={{ clipPath: 'polygon(0 0, 100% 0, 74% 100%, 0 100%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 halftone opacity-[0.06]"
      />

      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-6 md:mb-16 md:px-10">
        <SectionHeading section="contact" intro={t.contact.intro} />
      </div>

      {/* Main Asymmetric Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Direct Info (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 lg:col-span-5"
          >
            <div>
              <h3 className="mb-3 font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                {t.contact.pitch.before}
                <span className="text-[#e60012]">{t.contact.pitch.accent}</span>
                {t.contact.pitch.after}
              </h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                {t.contact.body}
              </p>
            </div>

            {/* Direct Contact Strips (crisp unclipped borders + Persona hard shadow) */}
            <div className="space-y-4">
              {/* Email Strip */}
              <div className="group flex items-center justify-between gap-3 border-2 border-white bg-[#0e0e0e] p-4 shadow-[6px_6px_0_#e60012] transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5">
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="flex min-w-0 items-center gap-3.5 outline-none"
                >
                  <div className="flex h-11 w-11 shrink-0 -rotate-3 items-center justify-center bg-[#e60012] text-white transition-transform duration-150 group-hover:rotate-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/55">
                      {t.contact.emailLabel}
                    </p>
                    <p className="truncate font-sans text-sm font-bold text-white transition-colors group-hover:text-[#e60012] md:text-base">
                      {t.contact.emailValue}
                    </p>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copiedEmail ? t.contact.copiedEmail : t.contact.copyEmail}
                  className={`inline-flex shrink-0 items-center gap-1.5 border-2 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    copiedEmail
                      ? 'border-white bg-white text-black'
                      : 'border-white/30 bg-black text-white hover:border-[#e60012] hover:bg-[#e60012] hover:text-white'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>{t.contact.copiedEmail}</span>
                    </>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Location Strip */}
              <div className="flex items-center gap-3.5 border-2 border-white/25 bg-[#0e0e0e] p-4">
                <div className="flex h-11 w-11 shrink-0 rotate-2 items-center justify-center bg-white text-black">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/55">
                    {t.contact.locationLabel}
                  </p>
                  <p className="font-sans text-sm font-bold text-white md:text-base">
                    {t.contact.locationValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links (only real profiles, crisp labeled Persona buttons) */}
            <div>
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-white/60">
                {t.contact.follow}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 border-2 border-white bg-black px-4 py-2.5 font-display text-base uppercase tracking-wider text-white shadow-[4px_4px_0_#e60012] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e60012] hover:text-white hover:shadow-[4px_4px_0_#ffffff]"
                  >
                    <social.icon className="h-4 w-4" />
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Persona Calling Card Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 32, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0.7 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 170, damping: 20 }}
            className="lg:col-span-7"
          >
            <div className="border-[5px] border-white bg-black p-2 shadow-[12px_12px_0_#e60012]">
              {/* Red Calling-Card Banner Header */}
              <div className="relative overflow-hidden bg-[#e60012] px-6 py-4 md:px-8">
                <div aria-hidden="true" className="hero-halftone opacity-25" />
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <span className="-rotate-1 inline-block bg-black px-3 py-1 font-display text-lg uppercase tracking-wider text-white shadow-[4px_4px_0_#ffffff] md:text-xl">
                    {t.contact.badge}
                  </span>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-black md:text-sm">
                    {t.contact.formHint}
                  </span>
                </div>
              </div>

              {/* Form Body */}
              <div className="bg-[#0a0a0a] p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {submissionStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="space-y-5 py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 1.8, rotate: -14, opacity: 0 }}
                        animate={{ scale: 1, rotate: -4, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                        className="inline-block border-[3px] border-white bg-[#e60012] px-6 py-2.5 shadow-[6px_6px_0_#ffffff]"
                      >
                        <span className="font-display text-2xl uppercase tracking-widest text-white md:text-3xl">
                          {t.contact.successStamp}
                        </span>
                      </motion.div>

                      <h4 className="pt-2 font-display text-2xl uppercase text-white">
                        {t.contact.successTitle}
                      </h4>

                      <p className="mx-auto max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                        {t.contact.successMsg}
                      </p>

                      {isSimulated && (
                        <p className="mx-auto max-w-md border-2 border-amber-400/50 bg-amber-500/10 p-3 text-left font-mono text-xs text-amber-300">
                          {t.contact.simulationNotice}
                        </p>
                      )}

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSubmissionStatus('idle')}
                          className="inline-flex items-center gap-2 border-2 border-white bg-white px-6 py-3 font-display text-base uppercase tracking-wider text-black shadow-[5px_5px_0_#e60012] transition-all hover:bg-[#e60012] hover:text-white hover:shadow-[5px_5px_0_#ffffff]"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {t.contact.sendAnother}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {submissionStatus === 'error' && (
                        <div
                          role="alert"
                          className="flex items-start gap-3 border-2 border-[#e60012] bg-[#e60012]/15 p-4 text-sm text-white"
                        >
                          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#e60012]" />
                          <div className="space-y-1">
                            <p className="font-bold">{errorMessage || t.contact.errorTitle}</p>
                            <p className="text-white/80">
                              {t.contact.errorFallback}{' '}
                              <a
                                href={`mailto:${t.contact.emailValue}`}
                                className="font-semibold text-white underline underline-offset-2 hover:text-[#e60012]"
                              >
                                {t.contact.emailValue}
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Name & Email Row */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-white/80"
                          >
                            {t.contact.name}
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={t.contact.namePlaceholder}
                            className={inputBaseClass}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-email"
                            className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-white/80"
                          >
                            {t.contact.email}
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={t.contact.emailPlaceholder}
                            className={inputBaseClass}
                          />
                        </div>
                      </div>

                      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
                      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        <label>
                          Website
                          <input
                            ref={honeypotRef}
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            defaultValue=""
                          />
                        </label>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-white/80"
                        >
                          {t.contact.subjectTag}
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          maxLength={150}
                          placeholder={t.contact.subjectPlaceholder}
                          className={inputBaseClass}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <label
                            htmlFor="contact-message"
                            className="font-mono text-xs font-bold uppercase tracking-wider text-white/80"
                          >
                            {t.contact.message}
                          </label>
                          <span className="font-mono text-xs tabular-nums text-white/55">
                            {formData.message.length}/1000
                          </span>
                        </div>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          maxLength={1000}
                          rows={4}
                          placeholder={t.contact.messagePlaceholder}
                          className={`${inputBaseClass} resize-none`}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { x: -2, y: -2 } : {}}
                          whileTap={!isSubmitting ? { x: 2, y: 2 } : {}}
                          className={`flex w-full items-center justify-center gap-3 border-2 border-white py-4 font-display text-xl uppercase tracking-wider transition-colors ${
                            isSubmitting
                              ? 'cursor-wait bg-[#e60012]/60 text-white'
                              : 'bg-[#e60012] text-white shadow-[6px_6px_0_#ffffff] hover:bg-white hover:text-black hover:shadow-[6px_6px_0_#e60012]'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                              <span>{t.contact.sending}</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>{t.contact.send}</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
