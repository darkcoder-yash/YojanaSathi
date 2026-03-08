import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import { Sprout, GraduationCap, Briefcase, Heart, Star, ChevronRight, Grid } from "lucide-react";
import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import { cn } from "@/lib/utils";

const Categories = () => {
  const { language } = useApp();
  const t = translations[language].dashboard;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { key: "farmer", label: translations[language].profile.farmer, icon: <Sprout className="w-8 h-8" />, color: "bg-green-100 text-green-700", border: "border-green-200" },
    { key: "student", label: translations[language].profile.student, icon: <GraduationCap className="w-8 h-8" />, color: "bg-purple-100 text-purple-700", border: "border-purple-200" },
    { key: "employment", label: t.jobs, icon: <Briefcase className="w-8 h-8" />, color: "bg-orange-100 text-orange-700", border: "border-orange-200" },
    { key: "general", label: t.health, icon: <Heart className="w-8 h-8" />, color: "bg-red-100 text-red-700", border: "border-red-200" },
  ];

  const filteredSchemes = selectedCategory 
    ? mockSchemes.filter(scheme => scheme.category === selectedCategory)
    : [];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t.categories}</h1>
        <p className="text-slate-500 font-medium">Browse government schemes by their primary sector and focus area.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <button 
            key={cat.key} 
            onClick={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
            className={cn(
              "p-6 rounded-2xl transition-all flex flex-col items-center text-center gap-4 group relative overflow-hidden",
              selectedCategory === cat.key 
                ? `${cat.color} ${cat.border} ring-2 ring-offset-2 ring-blue-500 scale-[1.02] shadow-lg` 
                : "bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
              selectedCategory === cat.key ? "bg-white/50" : cat.color
            )}>
              {cat.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{cat.label}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {mockSchemes.filter(s => s.category === cat.key).length} Schemes
              </p>
            </div>
            
            {selectedCategory === cat.key && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="space-y-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              Showing {categories.find(c => c.key === selectedCategory)?.label} Schemes
            </h2>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {filteredSchemes.length} Results Found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="h-full">
                <SchemeCard scheme={scheme} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedCategory && (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Grid className="w-10 h-10 text-slate-300" />
          </div>
          <div className="max-w-xs">
            <h3 className="text-lg font-bold text-slate-900">Select a Category</h3>
            <p className="text-sm text-slate-500 mt-2">Click on any category above to explore the specific government schemes available.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
