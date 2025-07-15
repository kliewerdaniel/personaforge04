import { create } from 'zustand';
import type { AIPersona } from '../types/persona';

interface SavedPersonasState {
  personas: AIPersona[];
  isLoading: boolean;
  error: string | null;

  fetchPersonas: () => void;
  addPersona: (persona: AIPersona) => void;
  updatePersona: (persona: AIPersona) => void;
  deletePersona: (id: string) => void;
}

export const useSavedPersonasStore = create<SavedPersonasState>((set, get) => ({
  personas: [],
  isLoading: false,
  error: null,

  fetchPersonas: () => {
    set({ isLoading: true, error: null });
    try {
      const storedPersonas = localStorage.getItem('personaForge_saved_personas');
      const parsedPersonas: AIPersona[] = storedPersonas ? JSON.parse(storedPersonas) : [];
      set({ personas: parsedPersonas, isLoading: false });
    } catch (e: any) {
      console.error("Failed to fetch personas from local storage:", e);
      set({ error: e.message, isLoading: false });
    }
  },

  addPersona: (persona) => {
    set((state) => {
      const updatedPersonas = [...state.personas, persona];
      localStorage.setItem('personaForge_saved_personas', JSON.stringify(updatedPersonas));
      return { personas: updatedPersonas };
    });
  },

  updatePersona: (updatedPersona) => {
    set((state) => {
      const updatedPersonas = state.personas.map((p) =>
        p.id === updatedPersona.id ? updatedPersona : p
      );
      localStorage.setItem('personaForge_saved_personas', JSON.stringify(updatedPersonas));
      return { personas: updatedPersonas };
    });
  },

  deletePersona: (id) => {
    set((state) => {
      const updatedPersonas = state.personas.filter((p) => p.id !== id);
      localStorage.setItem('personaForge_saved_personas', JSON.stringify(updatedPersonas));
      return { personas: updatedPersonas };
    });
  },
}));
