import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";

const AllSchemes = () => {
  const { language, userProfile } = useApp();
  const [searchParams] = useSearchParams();
  const t = translations[language].dashboard;

  const filter = searchParams.get("filter");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const isRecommended = filter === "recommended";

  const displayedSchemes = mockSchemes.filter((s) => {
    // Search filter
    if (searchQuery) {
      const nameMatch = s.name.toLowerCase().includes(searchQuery) || 
                        s.nameHi?.toLowerCase().includes(searchQuery);
      const descMatch = s.description.toLowerCase().includes(searchQuery) || 
                        s.descriptionHi?.toLowerCase().includes(searchQuery);
      const tagMatch = s.tags?.some(tag => tag.toLowerCase().includes(searchQuery));
      
      if (!nameMatch && !descMatch && !tagMatch) return false;
    }

    // Recommended filter
    if (isRecommended) {
      if (!userProfile?.occupation) return true;
      const occ = userProfile.occupation.toLowerCase();
      if (occ === "farmer") return s.category === "farmer";
      if (occ === "student") return s.category === "student";
      if (occ === "unemployed") return s.category === "employment";
      return true;
    }

    return true;
  });

  useEffect(() => {
    if (isRecommended || searchQuery) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isRecommended, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">
          {isRecommended ? t.recommended : t.allSchemes}
        </h1>
        {isRecommended && (
          <p className="text-sm text-slate-500 font-medium">
            Personalized government schemes based on your profile
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSchemes.map((scheme) => (
          <div key={scheme.id} className="transform hover:-translate-y-1 transition-all duration-300">
            <SchemeCard scheme={scheme} />
          </div>
        ))}
      </div>

      {displayedSchemes.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">{t.noSchemes}</p>
        </div>
      )}
    </div>
  );
};

export default AllSchemes;
