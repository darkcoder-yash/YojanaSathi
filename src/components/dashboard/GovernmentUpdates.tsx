import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { getGovernmentUpdates, GovernmentUpdate } from './updatesService';
import UpdatesCard from './UpdatesCard';

const GovernmentUpdates: React.FC = () => {
  const [updates, setUpdates] = useState<GovernmentUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        const data = await getGovernmentUpdates();
        if (data.length > 0) {
          setUpdates(data);
          setError(false);
        } else {
          // If service returns empty, it might be due to fail or just no updates
          // For now, if chatService or others fail, they have fallbacks.
          // Let's assume empty means no new AI generated updates yet.
          setUpdates([]);
          setError(false);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  return (
    <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-700" />
          Government Updates
        </h3>
        {!loading && updates.length > 0 && (
          <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
            Live AI
          </span>
        )}
      </div>
      
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto scrollbar-none">
        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-50 p-4 rounded-xl border border-slate-100 animate-pulse">
                <div className="flex gap-2 mb-3">
                  <div className="w-5 h-5 bg-slate-200 rounded-full" />
                  <div className="w-24 h-3 bg-slate-200 rounded" />
                </div>
                <div className="w-full h-4 bg-slate-200 rounded mb-2" />
                <div className="w-3/4 h-3 bg-slate-200 rounded mb-4" />
                <div className="flex justify-between">
                  <div className="w-16 h-3 bg-slate-200 rounded" />
                  <div className="w-16 h-3 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error || updates.length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <p className="text-xs text-slate-500 font-medium">No new updates available at the moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 text-[10px] font-bold text-blue-700 hover:underline"
            >
              Check for updates
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((update, index) => (
              <UpdatesCard key={index} {...update} />
            ))}
            <button className="w-full mt-2 py-2 text-xs font-bold text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              View All Updates
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentUpdates;
