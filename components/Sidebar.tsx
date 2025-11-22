import React from 'react';
import { LayoutDashboard, Car, FileText, Search, Calendar, Settings, LogOut, Wrench } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.FIND_WORKSHOPS, label: 'Find Workshops', icon: Search },
    { id: ViewState.GARAGE, label: 'My Garage', icon: Car },
    { id: ViewState.QUOTES, label: 'Quotes & Jobs', icon: FileText },
  ];

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-100 shadow-lg z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'} 
        flex flex-col justify-between
      `}
    >
      <div>
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center border-b border-gray-50">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xl">
                <Wrench className="w-8 h-8 fill-red-600 text-white" />
                {isOpen && <span className="text-gray-900 tracking-tight">Repair<span className="text-red-600">Connect</span></span>}
            </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200
                  ${isActive 
                    ? 'bg-red-50 text-red-600 font-semibold shadow-sm ring-1 ring-red-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                {isOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-50 space-y-2">
        <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
          {isOpen && <span>Settings</span>}
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;