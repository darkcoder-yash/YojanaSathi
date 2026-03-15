import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const IntroSplash = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFCFB] overflow-hidden">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
        }}
        className="relative mb-10"
      >
        <div className="w-36 h-32 md:w-44 md:h-44 rounded-full bg-white shadow-xl flex items-center justify-center p-6 border border-[#F0EDE8]">
          <img 
            src={logo} 
            alt="YojanaSathi Logo" 
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
        </div>
        
        {/* Soft glow effect behind logo */}
        <div className="absolute inset-0 -z-10 bg-primary/10 rounded-full blur-3xl scale-150 animate-pulse" />
      </motion.div>

      <div className="text-center space-y-4 px-6 max-w-lg">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-1">
            Yojana<span className="text-primary">Sathi</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg">योजनासाथी</p>
        </motion.div>
        
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-[1px] w-24 bg-slate-200 mx-auto"
        />

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-[0.3em] leading-relaxed"
        >
          Your Guide to Government Schemes
        </motion.p>
      </div>

      {/* Decorative footer element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-16 flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full gradient-saffron" />
        <div className="w-2 h-2 rounded-full bg-white border border-slate-200" />
        <div className="w-2 h-2 rounded-full gradient-green" />
      </motion.div>
    </div>
  );
};

export default IntroSplash;
