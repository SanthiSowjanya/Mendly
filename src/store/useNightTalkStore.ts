import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Session {
  id: string;
  user: string;
  mode: "Scheduled" | "Instant";
  duration: string;
  time: string;
  status: "pending" | "upcoming" | "completed" | "active";
}

interface NightTalkState {
  isInstantActive: boolean;
  sessions: Session[];
  toggleInstantActive: () => void;
  addSession: (session: Omit<Session, 'id'>) => void;
  updateSessionStatus: (id: string, status: Session['status']) => void;
}

export const useNightTalkStore = create<NightTalkState>()(
  persist(
    (set) => ({
      isInstantActive: true, // Default to true for MVP
      sessions: [
        // Dummy data as requested by MVP
        { id: "101", user: "Anonymous 44", mode: "Instant", duration: "15 mins", time: "Waiting now", status: "pending" },
        { id: "102", user: "Anonymous 12", mode: "Scheduled", duration: "20 mins", time: "Tonight, 11:30 PM", status: "upcoming" },
      ],
      toggleInstantActive: () => set((state) => ({ isInstantActive: !state.isInstantActive })),
      addSession: (session) => set((state) => ({ 
        sessions: [...state.sessions, { ...session, id: Math.random().toString(36).substring(7) }] 
      })),
      updateSessionStatus: (id, status) => set((state) => ({
        sessions: state.sessions.map(s => s.id === id ? { ...s, status } : s)
      }))
    }),
    {
      name: 'nighttalk-storage',
    }
  )
);
