import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { AIPersona } from '../types/persona';

// Helper to create an empty persona with default trait values
// Helper to create an empty persona with default trait values
const createEmptyPersona = (): AIPersona => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    name: 'New Persona',
    description: '',
    traits: {
      // Default values for the new traits schema
      tone_formal: 0.5,
      tone_informal: 0.5,
      tone_sarcastic: 0.5,
      humor_dry: 0.5,
      humor_absurd: 0.5,
      verbosity: 0.5,
      sentence_complexity: 0.5,

      political_left: 0.5,
      political_right: 0.5,
      populist: 0.5,
      institutionalist: 0.5,

      openness: 0.5,
      agreeableness: 0.5,
      conscientiousness: 0.5,
      assertiveness: 0.5,
      sentimentality: 0.5,

      vocabulary_complexity: 0.5,
      vocabulary_slang: 0.5,
      sentence_rhythm: 0.5,

      trust_mainstream: 0.5,
      trust_alternative: 0.5,
      bias_disclosure_level: 0.5,
      conspiracy_tolerance: 0.5,

      emotional_range: 0.5,
      anger_threshold: 0.5,
      compassion_depth: 0.5,
      reflective_mood: 0.5,

      storytelling_drive: 0.5,
      memory_weight: 0.5,
      character_consistency: 0.5,

      self_awareness: 0.5,
      evolution_preference: 0.5,
      performance_flair: 0.5,
    },
    metadata: {
      createdAt: now,
      lastModified: now,
      version: 1,
    },
  };
};

interface PersonaState {
  currentPersona: AIPersona;
  isDirty: boolean;
  lastSavedTimestamp: number | null;
  
  // Actions
  // The setTraitValue action now directly updates a trait within the 'traits' object
  setTraitValue: (traitName: keyof AIPersona['traits'], value: number) => void;
  loadPersona: (persona: AIPersona) => void;
  resetPersona: () => void;
  markAsSaved: () => void;
  setPersonaName: (name: string) => void;
  setPersonaDescription: (description: string) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  currentPersona: createEmptyPersona(),
  isDirty: false,
  lastSavedTimestamp: null,

  setTraitValue: (traitName, value) =>
    set((state) => {
      const updatedPersona = {
        ...state.currentPersona,
        traits: {
          ...state.currentPersona.traits,
          [traitName]: value, // Directly update the trait
        },
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      };
      return { currentPersona: updatedPersona, isDirty: true };
    }),

  loadPersona: (persona) =>
    set(() => {
      const now = new Date().toISOString();
      return {
        currentPersona: {
          ...persona,
          metadata: {
            createdAt: persona.metadata?.createdAt || now,
            lastModified: now,
            version: (persona.metadata?.version || 0) + 1, // Increment version on load/edit
          },
        },
        isDirty: false,
        lastSavedTimestamp: new Date().getTime(),
      };
    }),

  resetPersona: () =>
    set(() => ({
      currentPersona: createEmptyPersona(),
      isDirty: false,
      lastSavedTimestamp: null,
    })),

  markAsSaved: () =>
    set((state) => ({
      isDirty: false,
      lastSavedTimestamp: new Date().getTime(),
      currentPersona: {
        ...state.currentPersona,
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      },
    })),

  setPersonaName: (name: string) =>
    set((state) => ({
      currentPersona: {
        ...state.currentPersona,
        name,
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      },
      isDirty: true,
    })),

  setPersonaDescription: (description: string) =>
    set((state) => ({
      currentPersona: {
        ...state.currentPersona,
        description,
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      },
      isDirty: true,
    })),
}));

// Optional: Add a simple autosave to local storage
// This is a basic implementation and can be enhanced with debouncing,
// and more robust error handling.
usePersonaStore.subscribe(
  (state: PersonaState) => state.currentPersona, // Selector function
  (currentPersona: AIPersona) => { // Listener function
    if (currentPersona) {
      localStorage.setItem('personaForge_draft_persona', JSON.stringify(currentPersona));
    }
  },
  {
    equalityFn: (a: AIPersona, b: AIPersona) => JSON.stringify(a) === JSON.stringify(b), // Deep compare for changes
    fireImmediately: false,
  }
);
