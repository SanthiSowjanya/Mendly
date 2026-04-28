"use client";

import { Zap, Users, Settings, Activity, CalendarClock, PhoneOutgoing, BellElectric, Loader2 } from "lucide-react";
import Link from "next/link";
import { useNightTalkStore, Session } from "@/store/useNightTalkStore";
import { useState } from "react";

export default function AdminDashboard() {
  const { isInstantActive, toggleInstantActive, sessions, updateSessionStatus } = useNightTalkStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const assignedSessions = sessions.filter(
    (s) => s.status === "pending" || s.status === "upcoming"
  );

  const handleAccept = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      updateSessionStatus(id, "active");
      setLoadingId(null);
    }, 1500); // Simulated delay
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-white font-bold text-xl">
            <Zap className="w-6 h-6 text-indigo-500" />
            <span>NightTalk Admin</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors text-sm font-medium">View Live Site</Link>
            <Settings className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 md:py-10 space-y-8">
        
        {/* Statistics & Overview Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Status Toggle Box */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            {/* Background FX based on state */}
            {isInstantActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
            )}
            
            <div className="relative z-10 flex items-start space-x-4">
              <div className={`p-4 rounded-2xl ${isInstantActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                <Activity className={`w-8 h-8 ${isInstantActive ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">System Status</h2>
                <p className={`text-sm mt-1 font-medium ${isInstantActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isInstantActive ? "You are ONLINE and accepting Instant Talks" : "You are currently OFFLINE"}
                </p>
                <p className="text-slate-400 text-sm mt-2 max-w-sm">
                  Toggling ON makes "Instant Talk" visible on the main site.
                </p>
              </div>
            </div>

            <button
              onClick={toggleInstantActive}
              className={`relative z-10 w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center space-x-3 font-bold transition-all ${
                isInstantActive
                  ? "bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500/20"
                  : "bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
              }`}
            >
              <BellElectric className="w-5 h-5" />
              <span>{isInstantActive ? "Go Offline" : "Go Online (Accepting Instant)"}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-center">
             <div className="flex items-center space-x-3 mb-4">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-slate-300">Total Conversations</h3>
             </div>
             <p className="text-5xl font-black text-white">47</p>
             <p className="text-slate-500 text-sm mt-2">+3 today</p>
          </div>
        </div>

        {/* Sessions Area */}
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          
          {/* Incoming Instant Queue */}
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-slate-200 border-b border-slate-800 pb-4 flex items-center gap-2">
               <Zap className="w-5 h-5 text-amber-500" />
               Instant Queue
             </h3>
             {assignedSessions.filter(s => s.mode === "Instant").map(session => (
               <div key={session.id} className="p-6 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white text-lg">{session.user}</p>
                      <p className="text-slate-400 text-sm mt-1">{session.duration} • {session.time}</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase rounded-full">ACTION REQUIRED</span>
                  </div>
                  <button 
                    onClick={() => handleAccept(session.id)}
                    disabled={loadingId === session.id}
                    className="w-full h-12 flex justify-center items-center gap-2 bg-amber-500 text-amber-950 hover:bg-amber-400 transition-colors rounded-xl font-bold disabled:opacity-50"
                  >
                    {loadingId === session.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <PhoneOutgoing className="w-4 h-4" />
                        Launch Meet & Accept
                      </>
                    )}
                  </button>
               </div>
             ))}
             {assignedSessions.filter(s => s.mode === "Instant").length === 0 && (
                <div className="p-8 text-center border border-slate-800 rounded-2xl border-dashed">
                   <p className="text-slate-500">Queue is empty</p>
                </div>
             )}
          </div>

           {/* Upcoming Scheduled */}
           <div className="space-y-4">
             <h3 className="text-xl font-bold text-slate-200 border-b border-slate-800 pb-4 flex items-center gap-2">
               <CalendarClock className="w-5 h-5 text-blue-500" />
               Scheduled Call Roster
             </h3>
             {assignedSessions.filter(s => s.mode === "Scheduled").map(session => (
               <div key={session.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                      <p className="font-bold text-slate-200 text-lg">{session.user}</p>
                      <p className="text-slate-500 text-sm mt-1">{session.duration} • {session.time}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                     <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Confirmed</span>
                     <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors underline decoration-slate-600 underline-offset-4">
                        Details
                     </button>
                  </div>
               </div>
             ))}
             {assignedSessions.filter(s => s.mode === "Scheduled").length === 0 && (
                <div className="p-8 text-center border border-slate-800 rounded-2xl border-dashed">
                   <p className="text-slate-500">No scheduled calls</p>
                </div>
             )}
          </div>

        </div>

      </div>
    </div>
  );
}
