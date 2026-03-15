import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import StatCard from "@/components/dashboard/StatCard";
import GovernmentUpdates from "@/components/dashboard/GovernmentUpdates";
import { toast } from "sonner";
import {
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Bookmark,
  Calendar,
  ArrowRight,
  FileText,
  Download,
  ShieldCheck,
  Scale,
  MessageSquare,
  Mic,
  Filter,
  Layers,
  Sparkles,
  Users,
  CheckCircle
} from "lucide-react";
import { translations } from "@/data/translations";

const ServiceCard = ({
  icon: Icon,
  label,
  onClick
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 aspect-square group"
  >
    <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800 leading-tight">
      {label}
    </span>
  </div>
);

const ProgressStep = ({
  label,
  status,
  isLast
}: {
  label: string;
  status: "completed" | "current" | "pending";
  isLast?: boolean;
}) => {
  const statusColor =
    status === "completed"
      ? "bg-green-600 border-green-600 text-white"
      : status === "current"
      ? "bg-blue-600 border-blue-600 text-white"
      : "bg-white border-slate-300 text-slate-400";

  return (
    <div className="flex items-center flex-1 last:flex-none">
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${statusColor} transition-colors`}
        >
          {status === "completed" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : status === "current" ? (
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          ) : (
            <div className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
          )}
        </div>
        <span
          className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${
            status === "current" ? "text-blue-700" : "text-slate-500"
          }`}
        >
          {label}
        </span>
      </div>
      {!isLast && (
        <div
          className={`flex-1 h-0.5 mx-2 -mt-6 ${
            status === "completed" ? "bg-green-600" : "bg-slate-200"
          }`}
        />
      )}
    </div>
  );
};

const Dashboard = () => {
  const { userProfile, language, appliedSchemes } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [savedCount, setSavedCount] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const t = translations[language].dashboard;

  useEffect(() => {
    const updateSavedCount = () => {
      const saved = JSON.parse(localStorage.getItem("savedSchemes") || "[]");
      setSavedCount(saved.length);
    };

    updateSavedCount();
    window.addEventListener("savedSchemesUpdated", updateSavedCount);

    return () => {
      window.removeEventListener("savedSchemesUpdated", updateSavedCount);
    };
  }, []);

  const firstName =
    userProfile?.name?.split(" ")[0] || (language === "hi" ? "अतिथि" : "Guest");

  const handleSchemeSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    
    // Search logic to check for matches
    const matchingSchemes = mockSchemes.filter(s => {
      const nameMatch = s.name.toLowerCase().includes(query) || 
                        s.nameHi?.toLowerCase().includes(query);
      const tagMatch = s.tags?.some(tag => tag.toLowerCase().includes(query));
      const descMatch = s.description.toLowerCase().includes(query) || 
                        s.descriptionHi?.toLowerCase().includes(query);
      
      return nameMatch || tagMatch || descMatch;
    });

    if (matchingSchemes.length === 0) {
      toast.error(language === 'hi' ? "कोई मिलती-जुलती योजना नहीं मिली" : "No matching scheme found");
    } else {
      // Navigate to schemes page with search param
      navigate(`/schemes?search=${encodeURIComponent(query)}`);
    }
  };

  const recommendedSchemes = mockSchemes.filter((s) => {
    if (!userProfile?.occupation) return true;
    const occ = userProfile.occupation.toLowerCase();
    if (occ === "farmer") return s.category === "farmer";
    if (occ === "student") return s.category === "student";
    if (occ === "unemployed") return s.category === "employment";
    return true;
  });

  const totalSchemes = mockSchemes.length;
  const totalCategories = [...new Set(mockSchemes.map((s) => s.category))].length;
  const forYouCount = recommendedSchemes.length;
  const appliedCount = appliedSchemes.length;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 min-w-0">
        {/* 1. Hero Section */}
        <section className="bg-[#1E3A8A] rounded-2xl p-8 mb-8 relative overflow-hidden shadow-lg shadow-blue-900/20 group border border-blue-800">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-800/50 rounded text-[10px] font-bold text-blue-200 border border-blue-700/50 uppercase tracking-widest">
                {t.officialPortal}
              </span>
            </div>

            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
              {t.hello}, {firstName}!{" "}
              <span className="font-normal text-blue-300 text-2xl">
                | {t.welcomePortal}
              </span>
            </h1>

            <p className="text-blue-100/90 text-sm lg:text-base mb-8 max-w-xl leading-relaxed">
              {t.heroDescription}
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group-focus-within:scale-[1.01] transition-transform duration-300">
                <button 
                  onClick={handleSchemeSearch}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 flex items-center gap-2 border-r border-slate-200 pr-2 h-5 transition-colors z-10"
                >
                  <Search className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSchemeSearch()}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-white rounded-lg pl-14 pr-12 py-3.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl font-medium text-sm"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigate("/eligibility")}
                className="bg-[#FF9933] hover:bg-orange-600 text-white px-6 py-3.5 rounded-lg font-bold shadow-lg shadow-orange-900/20 whitespace-nowrap transition-all active:scale-95 flex items-center gap-2"
              >
                {t.checkEligibility}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
            <div className="w-64 h-64 rounded-full border-[20px] border-white/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-[10px] border-white/20" />
            </div>
          </div>
        </section>

        {/* 2. Stats Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Dashboard Overview
            </h2>

            <button
              onClick={() => setShowStats(!showStats)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 flex items-center justify-center transition-all"
              aria-label={showStats ? "Hide stats cards" : "Show stats cards"}
            >
              {showStats ? (
                <ChevronUp className="w-5 h-5 text-slate-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>

          {showStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatCard
                icon={Layers}
                value={totalSchemes}
                label={t.totalSchemes}
                iconColor="text-blue-700"
                bgColor="bg-blue-50"
                onClick={() => navigate("/schemes")}
                index={0}
              />
              <StatCard
                icon={Sparkles}
                value={forYouCount}
                label={t.forYou}
                iconColor="text-green-700"
                bgColor="bg-green-50"
                onClick={() => navigate("/schemes?filter=recommended")}
                index={1}
              />
              <StatCard
                icon={Users}
                value={totalCategories}
                label={t.categories}
                iconColor="text-purple-700"
                bgColor="bg-purple-50"
                onClick={() => navigate("/categories")}
                index={2}
              />
              <StatCard
                icon={CheckCircle}
                value={appliedCount}
                label={t.applied}
                iconColor="text-orange-700"
                bgColor="bg-orange-50"
                onClick={() => navigate("/track-application")}
                index={3}
              />
              <StatCard
                icon={Bookmark}
                value={savedCount}
                label={t.saved}
                iconColor="text-red-700"
                bgColor="bg-red-50"
                onClick={() => navigate("/saved")}
                index={4}
              />
            </div>
          )}
        </section>

        {/* 3. Quick Services Grid */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-l-4 border-blue-800 pl-3">
              {t.quickServices}
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            <ServiceCard icon={FileText} label={t.applyForScheme} onClick={() => navigate("/schemes")} />
            <ServiceCard icon={Search} label={t.trackStatus} onClick={() => navigate("/track-application")} />
            <ServiceCard icon={Download} label={t.downloadForms} onClick={() => navigate("/documents")} />
            <ServiceCard icon={ShieldCheck} label={t.verifyEligibility} onClick={() => navigate("/eligibility")} />
            <ServiceCard icon={Scale} label={t.compareBenefits} onClick={() => navigate("/compare")} />
            <ServiceCard icon={MessageSquare} label={t.grievanceSupport} onClick={() => navigate("/grievance")} />
          </div>
        </section>

        {/* 4. Application Progress Tracker */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {t.applicationStatus}
            </h2>

            <button
              onClick={() => navigate("/track-application")}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              {t.viewAllApplications}
            </button>
          </div>

          {appliedSchemes.length > 0 ? (
            <div className="space-y-8">
              {appliedSchemes.slice(0, 2).map((application) => (
                <div
                  key={application.applicationId}
                  className="border-b border-slate-50 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-sm">{application.schemeName}</h3>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                      Application ID: #{application.applicationId}
                    </span>
                  </div>

                  <div className="flex w-full mt-4">
                    <ProgressStep label="Applied" status="completed" />
                    <ProgressStep label="Under Review" status={application.status} />
                    <ProgressStep label="Approved" status="pending" />
                    <ProgressStep label="Disbursed" status="pending" isLast />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-sm text-slate-500 font-medium">{t.noActiveApplications}</p>
              <button
                onClick={() => navigate("/schemes")}
                className="mt-3 text-xs font-bold text-blue-700 hover:underline"
              >
                {t.startSearchingSchemes}
              </button>
            </div>
          )}
        </section>

        {/* 5. Recommended Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-l-4 border-orange-500 pl-3">
              {t.recommended}
            </h2>

            <button
              onClick={() => navigate("/recommendations")}
              className="text-sm font-bold text-blue-800 flex items-center gap-1 hover:underline transition-all group"
            >
              {t.seeAll}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedSchemes.slice(0, 4).map((scheme) => (
              <div
                key={scheme.id}
                className="transform hover:-translate-y-1 transition-transform duration-300 h-full"
              >
                <SchemeCard scheme={scheme} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Info Panel */}
      <aside className="w-full xl:w-[340px] space-y-6 hidden xl:block">
        <div className="sticky top-24 space-y-6">
          <GovernmentUpdates />

          <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-orange-50/50 p-4 border-b border-orange-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                {t.deadlines}
              </h3>
            </div>

            <div className="divide-y divide-slate-50">
              {[
                { date: "Feb 28", event: "Scholarship Deadline", urgent: true },
                { date: "Mar 15", event: "Kisan Credit Renewal", urgent: false },
                { date: "Mar 31", event: "Tax Saving Schemes", urgent: false }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg border ${
                        item.urgent
                          ? "bg-red-50 border-red-100 text-red-600"
                          : "bg-slate-50 border-slate-100 text-slate-600"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase">{item.date.split(" ")[0]}</span>
                      <span className="text-sm font-bold">{item.date.split(" ")[1]}</span>
                    </div>

                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                      {item.event}
                    </span>
                  </div>

                  {item.urgent && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Urgent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => navigate("/help")}
              className="bg-white p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 cursor-pointer transition-colors shadow-sm"
            >
              <MessageSquare className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-slate-600">{t.helpDesk}</p>
            </div>

            <div
              onClick={() => navigate("/documents")}
              className="bg-white p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 cursor-pointer transition-colors shadow-sm"
            >
              <FileText className="w-5 h-5 text-green-600 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-slate-600">{t.documents}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;