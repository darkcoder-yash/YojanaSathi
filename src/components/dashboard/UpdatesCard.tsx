import React from 'react';
import { Newspaper, Calendar, Tag } from 'lucide-react';

interface UpdatesCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
}

const UpdatesCard: React.FC<UpdatesCardProps> = ({ title, description, category, date }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Newspaper className="w-3.5 h-3.5" />
        </div>
        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider tracking-widest">Government Update</span>
      </div>
      
      <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
        {title}
      </h4>
      
      <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
            {category}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3 h-3" />
          <span className="text-[10px] font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default UpdatesCard;
