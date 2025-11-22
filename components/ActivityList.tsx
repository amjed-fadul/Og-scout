import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Quote } from '../types';

const mockQuotes: Quote[] = [
  { id: '1', workshopName: 'AutoPro Fixers', serviceType: 'Brake Pad Replacement', status: 'pending', date: '2023-10-24' },
  { id: '2', workshopName: 'Speedy Lube', serviceType: 'Full Service', status: 'accepted', amount: 450, date: '2023-10-20' },
];

const ActivityList: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending Quote</span>;
      case 'accepted': return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      default: return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-lg">Recent Activity</h3>
        <button className="text-sm text-red-600 hover:text-red-700 font-medium">View All</button>
      </div>
      <div className="divide-y divide-gray-50">
        {mockQuotes.map((quote) => (
          <div key={quote.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${quote.status === 'accepted' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                {quote.status === 'accepted' ? 
                  <CheckCircle className={`w-5 h-5 ${quote.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}`} /> :
                  <Clock className="w-5 h-5 text-yellow-600" />
                }
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{quote.workshopName}</h4>
                <p className="text-xs text-gray-500">{quote.serviceType} • {quote.date}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
               {quote.amount ? <span className="font-bold text-gray-900">AED {quote.amount}</span> : <span className="text-xs text-gray-400 italic">--</span>}
               {getStatusBadge(quote.status)}
            </div>
          </div>
        ))}
        
        {/* Empty State Visual if no quotes existed, but we have data now */}
        {mockQuotes.length === 0 && (
            <div className="p-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="text-gray-400 w-6 h-6" />
                </div>
                <p className="text-gray-500 text-sm">No recent activity</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;