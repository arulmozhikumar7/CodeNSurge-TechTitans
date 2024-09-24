import { create } from "zustand";
import { User } from "firebase/auth"; 

interface StoreState {
  user: User | null;  
  setUser: (user: User | null) => void; 
  country: string;
  setCountry: (country: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }), 
  country: "India",
  setCountry: (country) => set({ country }),
  language: "en",
  setLanguage: (language)=>set({language})
}));

export default useStore;
