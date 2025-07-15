import React from 'react';
import type { AIPersona } from '../types/persona';
import { generatePersonaPrompt } from '../utils/personaUtils';
import { useNotificationStore } from '../store/notificationStore';
import { FaClipboard } from 'react-icons/fa';

// Define the structure for trait categories and their descriptions
type TraitDefinitions = {
  [key in keyof AIPersona['traits']]: { [key: string]: string };
};

interface CopyPersonaButtonProps {
  persona: AIPersona;
  traitCategories: TraitDefinitions; // Renamed for clarity
}

const CopyPersonaButton: React.FC<CopyPersonaButtonProps> = ({ persona, traitCategories }) => {
  const { addNotification } = useNotificationStore();

  const handleCopy = async () => {
    try {
      const promptContent = generatePersonaPrompt(persona, traitCategories);
      await navigator.clipboard.writeText(promptContent);
      addNotification('Persona prompt copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy persona prompt: ', err);
      addNotification('Failed to copy persona prompt.', 'error');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full py-sm px-md rounded-md font-semibold transition-colors duration-200 bg-neutral-300 text-neutral-500 hover:bg-neutral-400 mt-sm flex items-center justify-center"
    >
      <FaClipboard className="mr-sm" /> Copy Persona to Clipboard
    </button>
  );
};

export default CopyPersonaButton;
