"use client";

import { Clock, Calendar, History, ArrowRight, UserCircle } from "lucide-react";
import Link from "next/link";
import { useNightTalkStore } from "@/store/useNightTalkStore";

export default function UserDashboard() {
  const { sessions, isInstantActive } = useNightTalkStore();

  const upcomingSessions = sessions.filter(
    (s) => s.status === "upcoming" || s.status === "pending"
  );

  const pastSessions = sessions.filter(
    (s) => s.status === "completed"
  );
  
  // Adding some static past ones to make it look populated for MVP
  const samplePastSessions = [
    { id: "past-1", date: "Yesterday, 10:00 PM", duration: "15 mins", type: "Instant" },
    { id: "past-2", date: "Oct 12, 12:15 AM", duration: "20 mins", type: "Scheduled" },
  ];

  return (
    <div className="min-h-screen text-slate-800 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-rose-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 mt-1">Your safe space awaits.</p>
          </div>
          <div className="p-3 bg-white rounded-full border border-rose-200 shadow-sm">
            <UserCircle className="w-8 h-8 text-rose-400" />
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Upcoming Sessions */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-rose-500">
                <Calendar className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Sessions</h2>
              </div>
              
              {upcomingSessions.length === 0 && (
                <div className="p-8 text-center bg-white border border-rose-200 rounded-2xl border-dashed">
                  <p className="text-slate-500">No upcoming sessions</p>
                </div>
              )}

              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-6 rounded-2xl bg-white shadow-md shadow-rose-900/5 border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-900 font-medium text-lg">{session.time}</p>
                    <p className="text-slate-500 text-sm mt-1">{session.duration} • {session.mode}</p>
                  </div>
                  <button className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 text-white text-sm font-medium rounded-xl transition-colors">
                    Join Waiting Room
                  </button>
                </div>
              ))}
            </section>

            {/* Past Sessions */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center space-x-2 text-slate-500">
                <History className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-slate-800">Past History</h2>
              </div>
              
              <div className="space-y-3">
                {samplePastSessions.map((session) => (
                  <div key={session.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-slate-700 font-medium">{session.date}</p>
                      <p className="text-slate-500 text-sm mt-0.5">{session.duration} • {session.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-400 border border-rose-200 shadow-xl shadow-rose-500/20 text-white">
              <h3 className="text-lg font-bold mb-2">Need someone to listen?</h3>
              <p className="text-sm text-rose-50 mb-6 pb-6 border-b border-rose-300/30">
                {isInstantActive 
                  ? "Listeners are currently online and available for instant connection."
                  : "All listeners are currently offline. Check back later or schedule a session."}
              </p>
              
              {isInstantActive && (
                <Link href="/" className="w-full flex items-center justify-center space-x-2 py-3.5 bg-white text-rose-600 font-bold rounded-xl hover:bg-rose-50 transition-all shadow-md">
                  <span>Talk Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
            
             <div className="p-6 rounded-3xl bg-rose-100/50 border border-rose-200 text-center">
              <p className="text-xs text-slate-500 leading-relaxed">
                NightTalk is a safe, anonymous space. All sessions are strictly confidential.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
