"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Clock, Zap, ArrowRight, ShieldCheck, CheckCircle2, QrCode, Loader2 } from "lucide-react";
import { useNightTalkStore } from "@/store/useNightTalkStore";
import { Button } from "@/components/ui/Button";

type FlowStep = "landing" | "mode_selection" | "duration_selection" | "payment" | "booking";
type Mode = "Scheduled" | "Instant" | null;

interface DurationOption {
  mins: number;
  price: number;
  label?: string;
  durationLabel: string;
}

const fadeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>("landing");
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const { isInstantActive, addSession } = useNightTalkStore();

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
    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      
      // Store session in mock store
      if (selectedMode && selectedDuration) {
        addSession({
          user: `Anonymous ${Math.floor(Math.random() * 100)}`,
          mode: selectedMode,
          duration: selectedDuration.durationLabel,
          time: selectedMode === "Instant" ? "Waiting now" : "Upcoming",
          status: selectedMode === "Instant" ? "pending" : "upcoming"
        });
      }

      setStep("booking");
    }, 2000);
  };

  // Duration options based on MVP specs
  const scheduledOptions: DurationOption[] = [
    { mins: 10, price: 50, label: "Base", durationLabel: "10 mins" },
    { mins: 20, price: 99, label: "Recommended", durationLabel: "20 mins" },
  ];

  const instantOptions: DurationOption[] = [
    { mins: 15, price: 149, label: "Premium Instant", durationLabel: "15 mins" },
    { mins: 20, price: 199, label: "Premium Instant", durationLabel: "20 mins" },
  ];

  const currentOptions = selectedMode === "Scheduled" ? scheduledOptions : instantOptions;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full relative z-10 min-h-[calc(100vh-64px)] overflow-hidden">
      
      {/* Background FX (Smooth dynamic gradient) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-rose-50/50">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-rose-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-pink-200/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* ----------- STEP 1: LANDING ----------- */}
        {step === "landing" && (
          <motion.div 
            key="landing"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center text-center space-y-8 mt-12"
          >
            <div className="p-5 bg-white shadow-xl shadow-rose-500/10 rounded-3xl border border-rose-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-transparent" />
              <Moon className="w-14 h-14 text-rose-400 relative z-10" />
            </div>
            <div className="space-y-5">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
                NightTalk
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-600 max-w-xl mx-auto leading-relaxed">
                You don’t need solutions. <br className="hidden md:block" />
                <span className="text-rose-500 font-medium tracking-wide">You just need someone to listen.</span>
              </p>
            </div>
            
            <div className="pt-8">
              <Button
                size="lg"
                onClick={handleStart}
                className="group w-full sm:w-auto h-14 rounded-full px-10 text-lg bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_0px_rgba(244,63,94,0.5)] transition-all duration-300 hover:scale-105 border border-rose-200"
              >
                <span className="mr-3">Start Talking</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center space-x-2 text-sm text-slate-600 bg-white/80 px-5 py-2.5 rounded-full border border-rose-200/60 backdrop-blur-sm shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Anonymous. Safe space. No judgment.</span>
            </div>
          </motion.div>
        )}

        {/* ----------- STEP 2: MODE SELECTION ----------- */}
        {step === "mode_selection" && (
          <motion.div 
            key="mode_selection"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full space-y-8"
          >
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-3xl font-bold text-slate-900">How would you like to connect?</h2>
              <p className="text-slate-600">Choose a session type that works for you.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <button
                onClick={() => handleModeSelect("Scheduled")}
                className="flex flex-col text-left p-6 md:p-8 rounded-3xl border border-rose-100 bg-white hover:bg-rose-50 hover:border-rose-200 transition-all duration-300 group shadow-xl shadow-rose-900/5"
              >
                <div className="mb-5 p-3 bg-rose-100 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-rose-200 transition-all duration-300">
                  <Clock className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-wide">Scheduled Session</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Book in advance. Structured availability. Lower pricing.</p>
              </button>

              <button
                onClick={() => isInstantActive ? handleModeSelect("Instant") : null}
                disabled={!isInstantActive}
                className={`flex flex-col text-left p-6 md:p-8 rounded-3xl border transition-all duration-300 group shadow-xl ${
                  isInstantActive 
                    ? "border-pink-200 bg-white hover:bg-pink-50 hover:border-pink-300 shadow-pink-900/5" 
                    : "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className={`mb-5 p-3 rounded-2xl w-fit transition-all duration-300 ${isInstantActive ? 'bg-pink-100 group-hover:scale-110' : 'bg-slate-200'}`}>
                  <Zap className={`w-7 h-7 ${isInstantActive ? 'text-pink-500 animate-pulse' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 flex items-center justify-between w-full tracking-wide">
                  Instant Talk
                  {isInstantActive && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-pink-100 border border-pink-200 text-pink-600 rounded-full mt-1">Available Now</span>
                  )}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {isInstantActive 
                    ? "Talk immediately to an available listener." 
                    : "Listeners are currently offline. Please use scheduled."}
                </p>
              </button>
            </div>
            
            <button 
              onClick={() => setStep("landing")}
              className="text-slate-400 text-sm hover:text-slate-600 transition-colors mx-auto block mt-8 font-medium"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* ----------- STEP 3: DURATION SELECTION ----------- */}
        {step === "duration_selection" && (
          <motion.div 
            key="duration_selection"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-md mx-auto space-y-8"
          >
             <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Choose Duration</h2>
              <p className="text-slate-600">
                {selectedMode === "Instant" ? "Fast tracked instant connection." : "Select how long you'd like to talk."}
              </p>
            </div>

            <div className="space-y-4">
              {currentOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleDurationSelect(opt)}
                  className="w-full relative flex items-center justify-between p-5 rounded-2xl border border-rose-100 bg-white hover:border-rose-300 hover:bg-rose-50 hover:shadow-lg transition-all duration-300 group shadow-md shadow-rose-900/5"
                >
                  {opt.label && (
                    <span className="absolute -top-3 left-6 px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full bg-rose-100 text-rose-700 border border-rose-200 shadow-sm">
                      {opt.label}
                    </span>
                  )}
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-rose-50 rounded-xl group-hover:scale-110 group-hover:bg-rose-100 transition-all duration-300 border border-rose-100/50">
                      <Clock className="w-6 h-6 text-rose-500 group-hover:text-rose-600" />
                    </div>
                    <span className="text-xl font-medium text-slate-800 tracking-wide">{opt.mins} Mins</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">₹{opt.price}</span>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep("mode_selection")}
              className="text-slate-400 text-sm hover:text-slate-600 transition-colors mx-auto block mt-8 font-medium"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* ----------- STEP 4: PAYMENT ----------- */}
        {step === "payment" && selectedDuration && (
          <motion.div 
            key="payment"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white border border-rose-100 rounded-3xl p-8 text-center space-y-8 shadow-2xl shadow-rose-900/10 relative overflow-hidden">
              {isVerifying && (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
                  <p className="text-rose-600 font-medium animate-pulse">Verifying payment...</p>
                </div>
              )}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Complete Payment</h2>
                <p className="text-slate-600">Scan to pay exactly <strong className="text-slate-900">₹{selectedDuration.price}</strong> for {selectedDuration.mins} mins.</p>
              </div>

              {/* Dummy QR Code UI */}
              <div className="bg-white p-4 rounded-3xl inline-block mx-auto shadow-xl shadow-rose-900/5 relative group border border-slate-100">
                <div className="w-48 h-48 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-rose-300 transition-colors">
                  <QrCode className="w-16 h-16 text-slate-300 mb-2" />
                  <span className="text-xs text-slate-400 font-medium">Dummy QR</span>
                </div>
              </div>

              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-sm text-slate-600 break-all flex items-center justify-center space-x-2">
                <span>UPI ID: <strong className="text-slate-800 selection:bg-pink-200 tracking-wide">nighttalk@upi</strong></span>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-6 px-4">After paying, click the button below to secure your session.</p>
                <Button
                  onClick={handlePaymentComplete}
                  disabled={isVerifying}
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-300 text-base font-bold hover:scale-[1.02]"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span>I have made the payment</span>
                </Button>
              </div>
              
              <button 
                onClick={() => setStep("duration_selection")}
                disabled={isVerifying}
                className="text-slate-400 text-sm hover:text-slate-600 transition-colors mx-auto block disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* ----------- STEP 5: BOOKING CONNECT ----------- */}
        {step === "booking" && (
          <motion.div 
            key="booking"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-md mx-auto text-center space-y-8"
          >
             <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-500/20"
             >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">Payment Confirmed</h2>
              <p className="text-slate-600 text-lg">Your safe space is booked successfully.</p>
            </div>

            <div className="p-8 bg-white border border-rose-100 rounded-3xl mt-8 shadow-xl shadow-rose-900/5">
              {selectedMode === "Scheduled" ? (
                <div className="space-y-6">
                  <p className="text-slate-600">Pick a time slot for your {selectedDuration?.mins}-minute session using our calendar.</p>
                  <Button
                    onClick={() => router.push('/dashboard/user')}
                    className="w-full h-14 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors text-base shadow-md shadow-rose-500/20"
                  >
                    Open Booking Calendar
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                   <p className="text-slate-600">A listener has been assigned and is ready for you now.</p>
                   <Button
                    onClick={() => router.push('/dashboard/user')}
                    className="w-full h-14 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-colors text-base shadow-md shadow-pink-500/20"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    <span>Join Session Now</span>
                  </Button>
                </div>
              )}
            </div>
            
             <button 
                onClick={() => {
                  setStep("landing");
                  setSelectedDuration(null);
                  setSelectedMode(null);
                }}
                className="text-slate-400 text-sm hover:text-slate-600 transition-colors mx-auto block mt-8 font-medium"
              >
                Return to Home
              </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer Disclaimer */}
      {(step === "landing" || step === "mode_selection") && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="fixed bottom-6 left-0 right-0 text-center px-4 w-full"
         >
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              <strong>Disclaimer:</strong> NightTalk is a listening service for emotional companionship. It is not a substitute for therapy or medical/mental health treatment. If you are in crisis, please contact local emergency services immediately.
            </p>
         </motion.div>
      )}

    </main>
  );
}
