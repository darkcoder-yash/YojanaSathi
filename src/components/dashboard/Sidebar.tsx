// Sidebar.tsx
import React from "react";
import {
  LayoutDashboard,
  List,
  Grid,
  Bookmark,
  ShieldCheck,
  User,
  HelpCircle,
  LogOut,
  X,
  Pencil,
  Mic,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  path,
  isCollapsed,
  onClick,
}: SidebarItemProps) => {
  const link = (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "group transition-all duration-200 font-medium text-sm",
          isCollapsed
            ? cn(
                "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-1 bg-white shadow-sm border border-slate-100 hover:shadow-md",
                isActive
                  ? "bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-200/70"
                  : "text-slate-700 hover:bg-slate-100 hover:text-blue-800"
              )
            : cn(
                "flex items-center gap-3 px-4 py-3 border-l-4 rounded-r-xl mr-3",
                isActive
                  ? "bg-blue-50 text-blue-900 border-blue-800 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-800 border-transparent"
              )
        )
      }
    >
      <Icon 
     className={cn(
     "w-5 h-5 flex-shrink-0 transition-colors",
     isCollapsed ? "text-slate-700 group-hover:text-blue-700" : ""
      )} />
      {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </NavLink>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-slate-900 text-white border-slate-800 rounded-lg px-3 py-1.5"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

const SidebarSectionHeader = ({
  label,
  isCollapsed,
}: {
  label: string;
  isCollapsed: boolean;
}) => {
  if (isCollapsed) return <div className="h-4" />;

  return (
    <div className="px-4 py-2 mt-4 mb-1">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </h3>
    </div>
  );
};

const Sidebar = ({
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { language, userProfile } = useApp();
  const t = translations[language].dashboard;
  const firstName = userProfile?.name || (language === "hi" ? "अतिथि" : "Guest");

  const menuGroups = [
    {
      title: t.mainSection,
      items: [
        { icon: LayoutDashboard, label: t.dashboardLabel, path: "/dashboard" },
      ]
    },
    {
      title: t.aiSection,
      items: [
        { icon: Mic, label: t.aiAssistant, path: "/voice-assistant" },
      ]
    },
    {
      title: t.schemesSection,
      items: [
        { icon: List, label: t.allSchemes, path: "/schemes" },
        { icon: Grid, label: t.categories, path: "/categories" },
        { icon: Bookmark, label: t.saved, path: "/saved" },
        { icon: ShieldCheck, label: t.checkEligibility, path: "/eligibility" },
      ]
    },
    {
      title: t.userSection,
      items: [
        { icon: User, label: t.profileLabel, path: "/profile" },
        { icon: HelpCircle, label: t.helpLabel, path: "/help" },
      ]
    }
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white/95 backdrop-blur-xl border-r border-slate-200/80 transition-all duration-300 flex flex-col shadow-[6px_0_30px_-18px_rgba(15,23,42,0.18)]",
          isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0",
          !isMobileOpen && (isCollapsed ? "lg:w-[96px]" : "lg:w-[280px]")
        )}
      >
        <div
          className={cn(
            "flex items-center h-18 px-6 py-5 border-b border-slate-100",
            isCollapsed && !isMobileOpen ? "justify-center px-0" : "justify-between"
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 min-w-[44px] bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md ring-4 ring-blue-50">
              Y
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900">YojanaSathi</h1>
                <span className="text-[10px] text-slate-500 uppercase">
                  Govt Services Portal
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <TooltipProvider>
          <nav className="flex-1 overflow-y-auto py-6 space-y-3">
            {menuGroups.map((group, index) => (
              <div key={index}>
                <SidebarSectionHeader
                  label={group.title}
                  isCollapsed={isCollapsed && !isMobileOpen}
                />

                {group.items.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isCollapsed={isCollapsed && !isMobileOpen}
                    onClick={() => isMobileOpen && onCloseMobile()}
                  />
                ))}
              </div>
            ))}
          </nav>
        </TooltipProvider>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          {(!isCollapsed || isMobileOpen) ? (
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                {firstName[0]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{firstName}</p>
                <p className="text-xs text-slate-500">Citizen</p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Edit Profile"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/profile")}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-800 font-bold shadow-sm border border-blue-100 hover:shadow-md hover:scale-105 transition-all"
              >
                {firstName[0]}
              </button>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className={cn(
              "mt-3 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors",
              isCollapsed && !isMobileOpen
                ? "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl"
                : "w-full flex items-center gap-3 px-3 py-2 rounded-lg"
            )}
          >
            <LogOut className="w-4 h-4" />
            {(!isCollapsed || isMobileOpen) && <span>{t.logout}</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;