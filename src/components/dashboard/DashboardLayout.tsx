// DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { cn } from "@/lib/utils";
import AIAssistant from "@/components/AIAssistant";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <main
        className={cn(
          "flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "lg:ml-[96px]" : "lg:ml-[280px]"
        )}
      >
        <div className="flex-1 px-4 lg:px-8 py-6 max-w-[1600px] mx-auto w-full">
          <Header
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <Outlet />
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default DashboardLayout;