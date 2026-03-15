import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  iconColor: string;
  bgColor: string;
  onClick?: () => void;
  index?: number;
}

const StatCard = ({ icon: Icon, value, label, iconColor, bgColor, onClick, index = 0 }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, translateY: -5 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        "bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer",
        onClick ? "" : "pointer-events-none"
      )}
    >
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6 shadow-sm", bgColor)}>
        <Icon className={cn("w-7 h-7", iconColor)} />
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-1 group-hover:text-blue-900 transition-colors">{value}</div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
};

export default StatCard;
