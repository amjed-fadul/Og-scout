import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import ActivityList from './components/ActivityList';
import VehicleCard from './components/VehicleCard';
import AIChatAssistant from './components/AIChatAssistant';
import { ViewState, Vehicle } from './types';
import { Bell, Plus, Wallet, CalendarClock, FileText, Menu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Data
const myVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2018, plate: 'DXB A 12345' },
  { id: '2', make: 'Nissan', model: 'Patrol', year: 2021, plate: 'DXB M 99887' }
];

const spendingData = [
  { name: 'Jan', amount: 0 }, { name: 'Feb', amount: 450 },
  { name: 'Mar', amount: 200 }, { name: 'Apr', amount: 0 },
  { name: 'May', amount: 850 }, { name: 'Jun', amount: 120 },
];

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle responsiveness
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
               <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {currentView === ViewState.DASHBOARD && 'Dashboard'}
                {currentView === ViewState.GARAGE && 'My Garage'}
                {currentView === ViewState.FIND_WORKSHOPS && 'Find Workshops'}
                {currentView === ViewState.QUOTES && 'Quotes & Activity'}
              </h1>
              <p className="text-xs text-gray-500">Welcome back, Amjed Fadul</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-red-200 hover:bg-red-700 transition-all active:scale-95">
                <Plus className="w-4 h-4" /> Request Quote
             </button>
             <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
             <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="flex items-center gap-3 pl-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-600">
                    AF
                </div>
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
            
          {/* 1. Stats Row - Consolidated & Clean */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <StatCard 
               label="Active Quotes" 
               value="1" 
               icon={FileText} 
               trend="+1" 
               trendUp={true} 
             />
             <StatCard 
               label="Appointments" 
               value="0" 
               icon={CalendarClock}
             />
             <StatCard 
               label="Total Spent" 
               value="AED 1,620" 
               icon={Wallet} 
               trend="-12%" 
               trendUp={false}
             />
              {/* Call to Action Card - Replaces the old "Request Quote" boxy card */}
             <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                <div>
                  <span className="inline-block px-2 py-1 bg-red-500 rounded text-[10px] font-bold uppercase tracking-wider mb-2">New Service</span>
                  <h3 className="font-bold text-lg">Find a Workshop</h3>
                </div>
                <div className="flex items-center justify-between mt-4 z-10">
                    <span className="text-sm text-gray-300">Get competitive quotes</span>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                        <Plus className="w-5 h-5" />
                    </div>
                </div>
             </div>
          </div>

          {/* 2. AI Section & Activity Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column: AI + Vehicles */}
             <div className="lg:col-span-2 space-y-8">
                
                {/* AI Component */}
                <AIChatAssistant />

                {/* Garage Section - Replaces duplicative "My Cars" card */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">My Garage</h2>
                      <button className="text-sm text-red-600 font-semibold hover:text-red-700 flex items-center gap-1">
                         <Plus className="w-4 h-4" /> Add Vehicle
                      </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {myVehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
                   </div>
                </div>

                 {/* Spending Chart (Added visual interest to replace empty space) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                   <h3 className="font-bold text-gray-900 mb-6">Spending Overview</h3>
                   <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={spendingData}>
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                           <YAxis hide />
                           <Tooltip 
                              cursor={{fill: 'transparent'}}
                              contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                           />
                           <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                              {spendingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.amount > 0 ? '#4f46e5' : '#e2e8f0'} />
                              ))}
                           </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

             </div>

             {/* Right Column: Activity Feed */}
             <div className="flex flex-col gap-6">
                <ActivityList />
                
                {/* Promo / Info Card */}
                <div className="bg-gradient-to-br from-orange-100 to-red-50 p-6 rounded-2xl border border-orange-100">
                    <h4 className="font-bold text-orange-900">Premium Care</h4>
                    <p className="text-sm text-orange-800/80 mt-2 mb-4">
                        Get 20% off your next service by verifying your vehicle details.
                    </p>
                    <button className="w-full py-2 bg-white text-orange-600 font-semibold text-sm rounded-lg shadow-sm hover:bg-orange-50 transition-colors">
                        Verify Now
                    </button>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;