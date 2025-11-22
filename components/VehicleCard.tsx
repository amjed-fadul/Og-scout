import React from 'react';
import { MoreHorizontal, Calendar, Gauge, Settings2 } from 'lucide-react';
import { Vehicle } from '../types';

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 p-4">
         <div className="absolute top-4 right-4">
             <button className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors">
                 <MoreHorizontal className="w-5 h-5" />
             </button>
         </div>
         <div className="mt-auto absolute bottom-4 left-4 text-white">
             <h3 className="font-bold text-xl tracking-tight">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
             <p className="text-sm opacity-80 font-mono bg-white/10 inline-block px-2 py-0.5 rounded mt-1">{vehicle.plate}</p>
         </div>
         <img 
            src="https://picsum.photos/400/200" 
            alt="Car Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay pointer-events-none"
         />
      </div>
      <div className="p-4 grid grid-cols-3 gap-2 divide-x divide-gray-100">
          <div className="text-center px-2">
              <span className="text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1"><Calendar className="w-3 h-3"/> Next Service</span>
              <span className="text-sm font-semibold text-gray-900">Nov 12</span>
          </div>
          <div className="text-center px-2">
              <span className="text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1"><Gauge className="w-3 h-3"/> Mileage</span>
              <span className="text-sm font-semibold text-gray-900">45,200 km</span>
          </div>
           <div className="text-center px-2">
              <span className="text-xs text-gray-400 block mb-1 flex items-center justify-center gap-1"><Settings2 className="w-3 h-3"/> Status</span>
              <span className="text-sm font-semibold text-green-600">Healthy</span>
          </div>
      </div>
      <div className="px-4 pb-4">
          <button className="w-full py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
              View History
          </button>
      </div>
    </div>
  );
};

export default VehicleCard;