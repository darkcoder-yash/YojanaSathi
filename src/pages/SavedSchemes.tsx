import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import { Bookmark, Search, ArrowRight } from "lucide-react";
import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SavedSchemes = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const t = translations[language].dashboard;
  const [savedSchemes, setSavedSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedSchemes = () => {
    setLoading(true);
    const savedIds = JSON.parse(localStorage.getItem("savedSchemes") || "[]");
    const filtered = mockSchemes.filter(s => savedIds.includes(s.id));
    setSavedSchemes(filtered);
    setLoading(false);
  };

  useEffect(() => {
    loadSavedSchemes();
    
    const handleUpdate = () => {
      loadSavedSchemes();
    };

    window.addEventListener("savedSchemesUpdated", handleUpdate);
    return () => window.removeEventListener("savedSchemesUpdated", handleUpdate);
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading your saved schemes...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">{t.saved}</h1>
        <p className="text-sm text-slate-500 font-medium">Quick access to schemes you've bookmarked</p>
      </div>

      {savedSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedSchemes.map((scheme) => (
            <div key={scheme.id} className="transform hover:-translate-y-1 transition-all duration-300">
              <SchemeCard scheme={scheme} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No saved schemes yet</h3>
          <p className="text-slate-500 max-w-xs mx-auto mb-8">
            Click the bookmark icon on any scheme to save it for later review and application.
          </p>
          <Button 
            onClick={() => navigate("/schemes")}
            className="gradient-saffron text-white font-bold rounded-xl px-8 h-12"
          >
            Browse All Schemes
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedSchemes;
