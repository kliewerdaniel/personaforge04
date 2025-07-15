import { create } from 'zustand';

interface ProgressState {
  completedSections: Set<string>;
  currentSection: string;
  visitedSections: Set<string>;
  
  markSectionComplete: (sectionName: string) => void;
  setCurrentSection: (sectionName: string) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  completedSections: new Set(),
  currentSection: '',
  visitedSections: new Set(),

  markSectionComplete: (sectionName) =>
    set((state) => ({
      completedSections: new Set(state.completedSections).add(sectionName),
    })),

  setCurrentSection: (sectionName) =>
    set((state) => ({
      currentSection: sectionName,
      visitedSections: new Set(state.visitedSections).add(sectionName),
    })),
}));
