"use client";

import { useState } from "react";
import { Moon, Clock, Zap, ArrowRight, ShieldCheck, CheckCircle2, QrCode } from "lucide-react";

type FlowStep = "landing" | "mode_selection" | "duration_selection" | "payment" | "booking";
type Mode = "scheduled" | "instant" | null;

interface DurationOption {
  mins: number;
  price: number;
  label?: string;
}

export default function Home() {
  const [step, setStep] = useState<FlowStep>("landing");
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);

  // MANUALLY TOGGLE THIS TO TEST INSTANT AVAILABILITY
  const isInstantAvailable = true;

  const handleStart = () => setStep("mode_selection");
  
  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setStep("duration_selection");
  };

  const handleDurationSelect = (option: DurationOption) => {
    setSelectedDuration(option);
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setStep("booking");
  };

  // Duration options based on MVP specs
  const scheduledOptions: DurationOption[] = [
    { mins: 10, price: 50, label: "Base" },
    { mins: 20, price: 99, label: "Recommended" },
  ];

  const instantOptions: DurationOption[] = [
    { mins: 15, price: 149, label: "Premium Instant" },
    { mins: 20, price: 199, label: "Premium Instant" },
  ];

  const currentOptions = selectedMode === "scheduled" ? scheduledOptions : instantOptions;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full relative z-10">
      
      {/* Background FX (Smooth dynamic gradient) */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-800/30 rounded-full blur-3xl" />
      </div>

      {/* ----------- STEP 1: LANDING ----------- */}
      {step === "landing" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center text-center space-y-8 mt-12">
          <div className="p-4 bg-slate-900 shadow-2xl shadow-indigo-500/10 rounded-3xl border border-slate-800">
            <Moon className="w-12 h-12 text-indigo-400" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              NightTalk
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-400 max-w-xl mx-auto leading-relaxed">
              You don’t need solutions. <br className="hidden md:block" />
              <span className="text-indigo-300 font-medium">You just need someone to listen.</span>
            </p>
          </div>
          
          <div className="pt-8">
            <button
              onClick={handleStart}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-10 font-medium text-white shadow-xl shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95"
            >
              <span className="mr-3 text-lg">Start Talking</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-2 text-sm text-slate-500 bg-slate-900/50 px-5 py-2.5 rounded-full border border-slate-800/60 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
            <span>100% Anonymous. Safe space. No judgment.</span>
          </div>
        </div>
      )}

      {/* ----------- STEP 2: MODE SELECTION ----------- */}
      {step === "mode_selection" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full space-y-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-bold text-slate-100">How would you like to connect?</h2>
            <p className="text-slate-400">Choose a session type that works for you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Scheduled Option */}
            <button
              onClick={() => handleModeSelect("scheduled")}
              className="flex flex-col text-left p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 transition-all group"
            >
              <div className="mb-4 p-3 bg-slate-800 rounded-2xl w-fit group-hover:bg-slate-700 transition-colors">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Scheduled Session</h3>
              <p className="text-sm text-slate-400">Book in advance. Structured availability. Lower pricing.</p>
            </button>

            {/* Instant Option */}
            <button
              onClick={() => isInstantAvailable ? handleModeSelect("instant") : null}
              disabled={!isInstantAvailable}
              className={`flex flex-col text-left p-6 md:p-8 rounded-3xl border transition-all group ${
                isInstantAvailable 
                  ? "border-indigo-800/50 bg-indigo-900/20 hover:bg-indigo-900/40 hover:border-indigo-700/80 shadow-[0_0_30px_-10px_rgba(79,70,229,0.2)]" 
                  : "border-slate-800 bg-slate-900/30 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className={`mb-4 p-3 rounded-2xl w-fit transition-colors ${isInstantAvailable ? 'bg-indigo-900/50 group-hover:bg-indigo-800/60' : 'bg-slate-800'}`}>
                <Zap className={`w-6 h-6 ${isInstantAvailable ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2 flex items-center justify-between w-full">
                Instant Talk
                {isInstantAvailable && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full">Available Now</span>
                )}
              </h3>
              <p className="text-sm text-slate-400">
                {isInstantAvailable 
                  ? "Talk immediately to an available listener." 
                  : "Listeners are currently offline. Please use scheduled."}
              </p>
            </button>
          </div>
          
          <button 
            onClick={() => setStep("landing")}
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors mx-auto block mt-8"
          >
            ← Back
          </button>
        </div>
      )}

      {/* ----------- STEP 3: DURATION SELECTION ----------- */}
      {step === "duration_selection" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full max-w-md mx-auto space-y-8">
           <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-slate-100">Choose Duration</h2>
            <p className="text-slate-400">
              {selectedMode === "instant" ? "Fast tracked instant connection." : "Select how long you'd like to talk."}
            </p>
          </div>

          <div className="space-y-4">
            {currentOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleDurationSelect(opt)}
                className="w-full relative flex items-center justify-between p-5 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-indigo-500/50 hover:bg-slate-800 transition-all group"
              >
                {opt.label && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {opt.label}
                  </span>
                )}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <Clock className="w-5 h-5 text-slate-300" />
                  </div>
                  <span className="text-xl font-medium text-slate-200">{opt.mins} Mins</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-white">₹{opt.price}</span>
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setStep("mode_selection")}
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors mx-auto block mt-8"
          >
            ← Back
          </button>
        </div>
      )}

      {/* ----------- STEP 4: PAYMENT ----------- */}
      {step === "payment" && selectedDuration && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-md mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-8 shadow-2xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
              <p className="text-slate-400">Scan to pay exactly <strong className="text-white">₹{selectedDuration.price}</strong> for {selectedDuration.mins} mins.</p>
            </div>

            {/* Dummy QR Code UI */}
            <div className="bg-white p-4 rounded-3xl inline-block mx-auto">
              <div className="w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <QrCode className="w-16 h-16 text-slate-400" />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-sm text-slate-300 break-all flex items-center justify-center space-x-2">
              <span>UPI ID: <strong className="text-white selection:bg-indigo-500/40">placeholder@upi</strong></span>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-6 px-4">After paying, click the button below to secure your session.</p>
              <button
                onClick={handlePaymentComplete}
                className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>I have made the payment</span>
              </button>
            </div>
            
            <button 
              onClick={() => setStep("duration_selection")}
              className="text-slate-500 text-sm hover:text-slate-300 transition-colors mx-auto block"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ----------- STEP 5: BOOKING CONNECT ----------- */}
      {step === "booking" && (
        <div className="animate-in fade-in zoom-in-95 duration-700 w-full max-w-md mx-auto text-center space-y-8">
           <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Payment Confirmed</h2>
            <p className="text-slate-400 text-lg">Your safe space is ready.</p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl mt-8">
            {selectedMode === "scheduled" ? (
              <div className="space-y-6">
                <p className="text-slate-300">Pick a time slot for your {selectedDuration?.mins}-minute session using our calendar below.</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors"
                >
                  Open Booking Calendar
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                 <p className="text-slate-300">A listener is available and waiting for you right now.</p>
                 <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-4 bg-amber-500 text-amber-950 rounded-xl font-bold hover:bg-amber-400 transition-colors flex justify-center items-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Join Session Now</span>
                </a>
              </div>
            )}
          </div>
          
           <button 
              onClick={() => {
                setStep("landing");
                setSelectedDuration(null);
                setSelectedMode(null);
              }}
              className="text-slate-500 text-sm hover:text-slate-300 transition-colors mx-auto block mt-8"
            >
              Return to Home
            </button>
        </div>
      )}
      
      {/* Footer Disclaimer */}
      {(step === "landing" || step === "mode_selection") && (
         <div className="fixed bottom-6 left-0 right-0 text-center px-4 w-full">
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              <strong>Disclaimer:</strong> NightTalk is a listening service for emotional companionship. It is not a substitute for therapy or medical/mental health treatment. If you are in a crisis, please contact local emergency services immediately.
            </p>
         </div>
      )}

    </main>
  );
}
