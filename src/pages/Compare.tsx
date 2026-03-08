import { useState } from "react";
import { ArrowLeftRight, Search, X, Check, ArrowRight, ShieldCheck, Zap, Info } from "lucide-react";
import { mockSchemes } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import { cn } from "@/lib/utils";

const Compare = () => {
  const { language } = useApp();
  const t = translations[language].dashboard;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchemes = mockSchemes.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.nameHi && s.nameHi.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleScheme = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedSchemes = mockSchemes.filter(s => selectedIds.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Compare Schemes</h1>
          <p className="text-slate-500 mt-1">Compare up to 3 schemes side-by-side to find the best one for you.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <Info className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-700">{selectedIds.length} of 3 schemes selected</span>
        </div>
      </div>

      {/* Scheme Selector Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search schemes to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
            {filteredSchemes.map((scheme) => {
              const isSelected = selectedIds.includes(scheme.id);
              return (
                <button
                  key={scheme.id}
                  onClick={() => toggleScheme(scheme.id)}
                  disabled={!isSelected && selectedIds.length >= 3}
                  className={cn(
                    "flex-shrink-0 w-64 p-4 rounded-xl border-2 transition-all text-left relative group",
                    isSelected 
                      ? "border-blue-600 bg-blue-50/50" 
                      : "border-slate-100 bg-white hover:border-blue-200 disabled:opacity-50 disabled:hover:border-slate-100"
                  )}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md z-10 animate-in zoom-in duration-200">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">
                    {scheme.category}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-1 line-clamp-1">
                    {language === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">{scheme.benefit}</span>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600"
                    )}>
                      <ArrowLeftRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {selectedSchemes.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-x-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="p-8 text-left bg-slate-50/50 w-64 min-w-[200px]">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Features</span>
                </th>
                {selectedSchemes.map(scheme => (
                  <th key={scheme.id} className="p-8 text-left border-l border-slate-100 relative group">
                    <button 
                      onClick={() => toggleScheme(scheme.id)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-2">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {language === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name}
                      </h3>
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase tracking-wider self-start">
                        {scheme.category}
                      </span>
                    </div>
                  </th>
                ))}
                {/* Placeholder columns if less than 3 */}
                {[...Array(3 - selectedSchemes.length)].map((_, i) => (
                  <th key={`empty-${i}`} className="p-8 text-left border-l border-slate-100 bg-slate-50/20">
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-3">
                        <ArrowLeftRight className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-medium">Add more to compare</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-8 bg-slate-50/30 font-bold text-slate-700">Financial Benefit</td>
                {selectedSchemes.map(scheme => (
                  <td key={scheme.id} className="p-8 border-l border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-blue-700">{language === 'hi' && scheme.benefitHi ? scheme.benefitHi : scheme.benefit}</span>
                    </div>
                  </td>
                ))}
                {[...Array(3 - selectedSchemes.length)].map((_, i) => <td key={i} className="p-8 border-l border-slate-100" />)}
              </tr>
              <tr>
                <td className="p-8 bg-slate-50/30 font-bold text-slate-700">Description</td>
                {selectedSchemes.map(scheme => (
                  <td key={scheme.id} className="p-8 border-l border-slate-100 text-sm text-slate-600 leading-relaxed">
                    {language === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
                  </td>
                ))}
                {[...Array(3 - selectedSchemes.length)].map((_, i) => <td key={i} className="p-8 border-l border-slate-100" />)}
              </tr>
              <tr>
                <td className="p-8 bg-slate-50/30 font-bold text-slate-700">Key Eligibility</td>
                {selectedSchemes.map(scheme => (
                  <td key={scheme.id} className="p-8 border-l border-slate-100">
                    <ul className="space-y-3">
                      {(language === 'hi' && scheme.eligibilityHi ? scheme.eligibilityHi : scheme.eligibility).slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-xs font-medium text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
                {[...Array(3 - selectedSchemes.length)].map((_, i) => <td key={i} className="p-8 border-l border-slate-100" />)}
              </tr>
              <tr>
                <td className="p-8 bg-slate-50/30 font-bold text-slate-700">Verification Level</td>
                {selectedSchemes.map(scheme => (
                  <td key={scheme.id} className="p-8 border-l border-slate-100">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 w-fit">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase">Standard KYC</span>
                    </div>
                  </td>
                ))}
                {[...Array(3 - selectedSchemes.length)].map((_, i) => <td key={i} className="p-8 border-l border-slate-100" />)}
              </tr>
              <tr>
                <td className="p-8 bg-slate-50/30 font-bold text-slate-700">Actions</td>
                {selectedSchemes.map(scheme => (
                  <td key={scheme.id} className="p-8 border-l border-slate-100">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="w-full mt-3 py-3 text-blue-700 font-bold hover:bg-blue-50 transition-all rounded-xl border border-blue-100">
                      Full Details
                    </button>
                  </td>
                ))}
                {[...Array(3 - selectedSchemes.length)].map((_, i) => <td key={i} className="p-8 border-l border-slate-100" />)}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-20 rounded-2xl text-center border-2 border-dashed border-slate-200 shadow-sm">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowLeftRight className="w-10 h-10 text-blue-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Compare?</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
            Select schemes from the search bar above to see their benefits and eligibility side-by-side.
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="flex -space-x-3 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-100 border border-slate-200" />
                ))}
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compare 2,500+ Schemes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
