import React, { useState } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { diagnoseCarIssue } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagnose = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await diagnoseCarIssue(input);
      setResponse(result);
    } catch (e) {
      setResponse("Sorry, something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              AI Mechanic Assistant
            </h3>
            <p className="text-indigo-100 text-sm mt-1 max-w-md">
              Describe a noise or problem, and our AI will help diagnose it and find the right specialist.
            </p>
          </div>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-colors">
            Start Diagnosis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-2xl border border-purple-100 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          AI Mechanic Diagnosis
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        {!response ? (
          <div className="space-y-4">
             <p className="text-gray-600 text-sm">
                Describe what's happening with your car (e.g., "Clicking sound when turning left" or "Engine light is blinking").
             </p>
             <div className="relative">
                <textarea 
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm"
                  rows={3}
                  placeholder="Describe your issue here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleDiagnose();
                      }
                  }}
                />
                <button 
                  onClick={handleDiagnose}
                  disabled={isLoading || !input.trim()}
                  className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
             </div>
          </div>
        ) : (
           <div className="prose prose-sm max-w-none text-gray-700">
              <ReactMarkdown>{response}</ReactMarkdown>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                 <button onClick={() => setResponse(null)} className="text-gray-500 text-sm hover:text-gray-700 px-3 py-1">Ask another</button>
                 <button onClick={() => setIsOpen(false)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                    Find Workshops Now
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default AIChatAssistant;