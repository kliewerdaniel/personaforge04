import type { AIPersona } from '../types/persona';

// Define the structure for trait categories and their descriptions
type TraitCategories = {
  [key in keyof AIPersona['traits']]: { [key: string]: string };
};

export const generatePersonaPrompt = (persona: AIPersona, traitCategories: TraitCategories): string => {
  let prompt = `# AI Persona Guide\n\n`;
  prompt += `The following values (between 0.0 and 1.0) guide an LLM's tone, logic, and behavior across various dimensions.\n\n`;

  for (const categoryKey in persona.traits) {
    if (Object.prototype.hasOwnProperty.call(persona.traits, categoryKey)) {
      const category = persona.traits[categoryKey as keyof AIPersona['traits']];
      const categoryDescriptions = traitCategories[categoryKey as keyof AIPersona['traits']];

      for (const traitKey in category) {
        if (Object.prototype.hasOwnProperty.call(category, traitKey)) {
          const value = (category as any)[traitKey];
          const description = categoryDescriptions?.[traitKey] || `No description available for ${traitKey}.`;
          prompt += `- **${categoryKey}.${traitKey}**: ${value.toFixed(2)} - ${description}\n`;
        }
      }
    }
  }


  return prompt;
};
