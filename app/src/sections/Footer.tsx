import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { MENU_ITEMS } from '@/components/persona/config';

const Footer = () => {
  const { t } = useI18n();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-dark-grey/60 border-t-2 border-red py-8 md:py-12">
      <div className="absolute inset-x-0 top-0 h-1 slash-stripes" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-white/70 text-sm">
              © {currentYear} <span className="text-white font-medium">Javier Andrade</span>. {t.footer.rights}
            </p>
            <p className="font-hand text-red text-xs mt-1">
              {t.footer.signature}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-6 font-mono text-xs tracking-widest"
          >
            {MENU_ITEMS.filter((item) => !item.external).map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-white/50 hover:text-red transition-colors duration-200 relative group"
              >
                {t.menu[item.key].label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.nav>

          {/* Back to Top */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToTop}
            aria-label={t.a11y.backToTop}
            whileHover={{ scale: 1.1, y: -3, rotate: -6 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 border-2 border-white/20 cut-corner-tag flex items-center justify-center text-white/50 hover:text-black hover:bg-red hover:border-red transition-all duration-300"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
