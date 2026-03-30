import { Clock, Calendar, History, ArrowRight, UserCircle } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  // Static mock data for MVP
  const upcomingSessions = [
    { id: 1, date: "Tonight, 11:30 PM", duration: "20 Mins", status: "Scheduled" }
  ];

  const pastSessions = [
    { id: 2, date: "Yesterday, 10:00 PM", duration: "15 Mins", type: "Instant" },
    { id: 3, date: "Oct 12, 12:15 AM", duration: "20 Mins", type: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
            <p className="text-slate-400 mt-1">Your safe space awaits.</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-full border border-slate-800">
            <UserCircle className="w-8 h-8 text-indigo-400" />
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Upcoming Sessions */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-300">
                <Calendar className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              </div>
              
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-6 rounded-2xl bg-indigo-900/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-medium text-lg">{session.date}</p>
                    <p className="text-indigo-300/80 text-sm mt-1">{session.duration} • {session.status}</p>
                  </div>
                  <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors">
                    Join Waiting Room
                  </button>
                </div>
              ))}
            </section>

            {/* Past Sessions */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <History className="w-5 h-5" />
                <h2 className="text-xl font-semibold text-slate-300">Past History</h2>
              </div>
              
              <div className="space-y-3">
                {pastSessions.map((session) => (
                  <div key={session.id} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-slate-200 font-medium">{session.date}</p>
                      <p className="text-slate-500 text-sm mt-0.5">{session.duration} • {session.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl shadow-black/50">
              <h3 className="text-lg font-bold text-white mb-2">Need someone to listen?</h3>
              <p className="text-sm text-slate-400 mb-6 pb-6 border-b border-slate-800">
                Listeners are currently online and available for instant connection.
              </p>
              
              <Link href="/" className="w-full flex items-center justify-center space-x-2 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all">
                <span>Talk Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/50 text-center">
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
