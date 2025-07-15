import React, { useState, useEffect } from 'react';
import { usePersonaStore } from '../store/personaStore';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import TraitSlider from '../components/TraitSlider';
import PersonaPreviewCard from '../components/PersonaPreviewCard';
import NotificationContainer from '../components/NotificationToast';
import { useNotificationStore } from '../store/notificationStore';
import type { AIPersona } from '../types/persona';
import { useProgressStore } from '../store/progressStore';
import { useSavedPersonasStore } from '../store/savedPersonasStore';
import CopyPersonaButton from '../components/CopyPersonaButton';
import { FaSave, FaClipboard, FaFileExport, FaFileImport } from 'react-icons/fa';

// Define categories and their descriptions for grouping traits in the UI
const traitCategories = {
  tone: {
    label: "Tone",
    description: "Defines the emotional and stylistic qualities of the AI's communication.",
    traits: ['tone_formal', 'tone_informal', 'tone_sarcastic', 'humor_dry', 'humor_absurd', 'verbosity', 'sentence_complexity']
  },
  political: {
    label: "Political Leaning",
    description: "Influences the AI's perspective on political topics.",
    traits: ['political_left', 'political_right', 'populist', 'institutionalist']
  },
  personality: {
    label: "Personality (Big 5)",
    description: "Core personality traits influencing general behavior.",
    traits: ['openness', 'agreeableness', 'conscientiousness', 'assertiveness', 'sentimentality']
  },
  vocabulary: {
    label: "Vocabulary & Rhythm",
    description: "Characteristics related to word choice and sentence flow.",
    traits: ['vocabulary_complexity', 'vocabulary_slang', 'sentence_rhythm']
  },
  trust_bias: {
    label: "Trust & Bias",
    description: "How the AI processes and presents information regarding trust and bias.",
    traits: ['trust_mainstream', 'trust_alternative', 'bias_disclosure_level', 'conspiracy_tolerance']
  },
  emotional_depth: {
    label: "Emotional Depth",
    description: "The AI's capacity for emotional expression and understanding.",
    traits: ['emotional_range', 'anger_threshold', 'compassion_depth', 'reflective_mood']
  },
  narrative: {
    label: "Narrative & Memory",
    description: "Influences the AI's storytelling and information retention.",
    traits: ['storytelling_drive', 'memory_weight', 'character_consistency']
  },
  self_perception: {
    label: "Self-Perception & Evolution",
    description: "How the AI perceives itself and its adaptability.",
    traits: ['self_awareness', 'evolution_preference', 'performance_flair']
  }
};

// Define detailed descriptions for each individual trait
const traitDefinitions: { [key: string]: string } = {
  tone_formal: "How formal or casual the AI's language is. (0: Very Informal, 1: Very Formal)",
  tone_informal: "How informal or casual the AI's language is. (0: Very Formal, 1: Very Informal)",
  tone_sarcastic: "The AI's tendency to use sarcasm. (0: Not Sarcastic, 1: Highly Sarcastic)",
  humor_dry: "The AI's inclination towards dry humor. (0: No Dry Humor, 1: Strong Dry Humor)",
  humor_absurd: "The AI's inclination towards absurd humor. (0: No Absurd Humor, 1: Strong Absurd Humor)",
  verbosity: "How concise or verbose the AI's responses are. (0: Very Concise, 1: Very Verbose)",
  sentence_complexity: "The complexity of the AI's sentence structures. (0: Simple, 1: Complex)",

  political_left: "Leaning towards left-wing political views. (0: Right-leaning, 1: Left-leaning)",
  political_right: "Leaning towards right-wing political views. (0: Left-leaning, 1: Right-leaning)",
  populist: "Tendency to appeal to popular sentiment. (0: Elitist, 1: Populist)",
  institutionalist: "Tendency to support established institutions. (0: Anti-establishment, 1: Pro-establishment)",

  openness: "Openness to experience. (0: Conventional, 1: Inventive/Curious)",
  agreeableness: "Tendency to be compassionate and cooperative. (0: Challenging, 1: Agreeable)",
  conscientiousness: "Tendency to be organized and disciplined. (0: Spontaneous, 1: Organized)",
  assertiveness: "Tendency to be self-assured and forceful. (0: Passive, 1: Assertive)",
  sentimentality: "Tendency to be sentimental or emotional. (0: Rational, 1: Sentimental)",

  vocabulary_complexity: "The complexity of the AI's vocabulary. (0: Simple, 1: Complex)",
  vocabulary_slang: "The AI's use of slang. (0: No Slang, 1: Frequent Slang)",
  sentence_rhythm: "The rhythmic quality of the AI's sentences. (0: Monotone, 1: Dynamic)",

  trust_mainstream: "Trust in mainstream sources of information. (0: Distrust, 1: High Trust)",
  trust_alternative: "Trust in alternative sources of information. (0: Distrust, 1: High Trust)",
  bias_disclosure_level: "How much the AI discloses its own biases. (0: Hides Bias, 1: Fully Discloses Bias)",
  conspiracy_tolerance: "Tolerance for conspiracy theories. (0: Dismissive, 1: Open to)",

  emotional_range: "The breadth of emotions the AI can express. (0: Limited, 1: Wide Range)",
  anger_threshold: "How easily the AI expresses anger. (0: Easily Angered, 1: High Threshold)",
  compassion_depth: "The depth of the AI's compassion. (0: Shallow, 1: Profound)",
  reflective_mood: "The AI's tendency towards thoughtful contemplation. (0: Impulsive, 1: Highly Reflective)",

  storytelling_drive: "The AI's inclination to tell stories. (0: Factual, 1: Story-driven)",
  memory_weight: "How much the AI emphasizes past memories in responses. (0: Present-focused, 1: Memory-driven)",
  character_consistency: "How consistent the AI's character remains over time. (0: Inconsistent, 1: Highly Consistent)",

  self_awareness: "The AI's understanding of its own capabilities and limitations. (0: Low, 1: High)",
  evolution_preference: "The AI's preference for evolving its persona. (0: Static, 1: Dynamic)",
  performance_flair: "The AI's tendency to add flair or showmanship to its output. (0: Plain, 1: Flamboyant)",
};

const CreatePersonaPage: React.FC = () => {
  const { currentPersona, setTraitValue, setPersonaName, setPersonaDescription, markAsSaved, loadPersona } = usePersonaStore();
  const { addNotification } = useNotificationStore();
  const { setCurrentSection, markSectionComplete } = useProgressStore();
  const { addPersona, updatePersona, personas } = useSavedPersonasStore();
  // Initialize activeCategory to the first category key
  const [activeCategory, setActiveCategory] = useState<keyof typeof traitCategories>(Object.keys(traitCategories)[0] as keyof typeof traitCategories);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    setCurrentSection(activeCategory);
    // Mark section complete if all traits in the active category have been touched
    const allTraitsTouched = traitCategories[activeCategory].traits.every(traitKey =>
      (currentPersona.traits as any)[traitKey] !== undefined
    );
    if (allTraitsTouched) {
      markSectionComplete(activeCategory);
    }
  }, [activeCategory, currentPersona.traits, setCurrentSection, markSectionComplete]);

  const handleSavePersona = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Shorter delay for better UX

      const existingPersona = personas.find(p => p.id === currentPersona.id);
      if (existingPersona) {
        updatePersona(currentPersona);
        addNotification(`Persona '${currentPersona.name}' updated successfully!`, 'success');
      } else {
        addPersona(currentPersona);
        addNotification(`Persona '${currentPersona.name}' saved successfully!`, 'success');
      }
      markAsSaved();
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error('Failed to save persona:', error);
      addNotification('Failed to save persona.', 'error');
    }
  };

  const isSaveDisabled = !currentPersona.name.trim(); // Disable if name is empty

  const handleExportPersona = () => {
    const filename = `persona_${currentPersona.name.replace(/\s+/g, '_')}_${currentPersona.id.substring(0, 8)}.json`;
    const jsonStr = JSON.stringify(currentPersona, null, 2); // Pretty print JSON

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification('Persona exported successfully!', 'success');
    setIsExportModalOpen(false);
  };

  const handleImportPersona = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData: AIPersona = JSON.parse(content);

        // Basic validation: check for required fields and structure
        if (!importedData.id || !importedData.name || !importedData.traits) {
          throw new Error('Invalid persona format: Missing required fields (id, name, traits).');
        }
        // More robust validation would involve a JSON schema validator library

        loadPersona(importedData);
        addNotification(`Persona '${importedData.name}' imported successfully!`, 'success');
      } catch (error: any) {
        console.error('Failed to import persona:', error);
        addNotification(`Failed to import persona: ${error.message}`, 'error');
      } finally {
        // Clear the file input to allow re-importing the same file
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const currentCategoryTraits = traitDefinitions[activeCategory];

  return (
    <div className="flex-1 p-lg flex">
      <div className="flex-1 pr-lg">
        <h2 className="mb-lg">Create Persona</h2>
        <NotificationContainer />

        {/* Trait Categories as Tabs */}
        {/* Trait Categories as Tabs */}
        <CategoryTabs
          categories={Object.keys(traitCategories).map(key => ({
            key: key,
            label: traitCategories[key as keyof typeof traitCategories].label
          }))}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory as (category: string) => void}
        />

        {/* Persona Name and Description */}
        <div className="bg-neutral-100 p-md rounded-lg shadow-md mb-lg">
          <h3 className="text-primary mb-sm">Persona Details</h3>
          <div className="mb-md">
            <label htmlFor="personaName" className="block text-sm font-medium text-neutral-500 mb-xs">
              Persona Name
            </label>
            <input
              type="text"
              id="personaName"
              value={currentPersona.name}
              onChange={(e) => setPersonaName(e.target.value)}
              className="w-full p-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g., Creative Assistant"
            />
          </div>
          <div className="mb-md">
            <label htmlFor="personaDescription" className="block text-sm font-medium text-neutral-500 mb-xs">
              Description
            </label>
            <textarea
              id="personaDescription"
              value={currentPersona.description || ''}
              onChange={(e) => setPersonaDescription(e.target.value)}
              rows={3}
              className="w-full p-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              placeholder="A brief overview of this persona's character..."
            ></textarea>
          </div>
        </div>

        {/* Trait Sliders for Active Category */}
        <div className="bg-neutral-100 p-md rounded-lg shadow-md">
          <h3 className="text-primary mb-lg">
            {traitCategories[activeCategory].label} Traits
          </h3>
          {traitCategories[activeCategory].traits.map((traitKey) => (
            <TraitSlider
              key={traitKey}
              traitName={traitKey.replace(/([A-Z])/g, ' $1').trim()}
              value={(currentPersona.traits as any)[traitKey]}
              onChange={(newValue) => setTraitValue(traitKey as keyof AIPersona['traits'], newValue)}
              tooltipContent={traitDefinitions[traitKey]}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar for Persona Preview */}
      <div className="w-[25%] flex-shrink-0 flex flex-col pl-lg">
        <PersonaPreviewCard personaData={currentPersona} />
        <div className="mt-auto p-md bg-neutral-100 rounded-lg shadow-md">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="w-full py-sm px-md rounded-md font-semibold transition-colors duration-200 bg-primary text-white hover:bg-primary-800 flex items-center justify-center"
            disabled={isSaveDisabled}
          >
            <FaSave className="mr-sm" /> Save Persona
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="w-full py-sm px-md rounded-md font-semibold transition-colors duration-200 bg-secondary text-white hover:bg-secondary-800 mt-sm flex items-center justify-center"
          >
            <FaFileExport className="mr-sm" /> Export Persona
          </button>
          <input
            type="file"
            id="importPersonaInput"
            className="hidden"
            accept=".json"
            onChange={handleImportPersona}
          />
          <button
            onClick={() => document.getElementById('importPersonaInput')?.click()}
            className="w-full py-sm px-md rounded-md font-semibold transition-colors duration-200 bg-neutral-300 text-neutral-500 hover:bg-neutral-400 mt-sm flex items-center justify-center"
          >
            <FaFileImport className="mr-sm" /> Import Persona
          </button>
          <CopyPersonaButton persona={currentPersona} traitCategories={traitDefinitions} />
        </div>
      </div>

      {/* Save Persona Modal */}
      <Transition appear show={isSaveModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsSaveModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-lg text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-500"
                  >
                    Confirm Save Persona
                  </Dialog.Title>
                  <div className="mt-md">
                    <p className="text-sm text-neutral-500">
                      Are you sure you want to save the current persona?
                    </p>
                  </div>

                  <div className="mt-lg flex justify-end space-x-sm">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-neutral-200 px-md py-sm text-sm font-medium text-neutral-500 hover:bg-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                      onClick={() => setIsSaveModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-md py-sm text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={handleSavePersona}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Export Persona Modal */}
      <Transition appear show={isExportModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsExportModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-lg text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-500"
                  >
                    Confirm Export Persona
                  </Dialog.Title>
                  <div className="mt-md">
                    <p className="text-sm text-neutral-500">
                      Are you sure you want to export the current persona as a JSON file?
                    </p>
                  </div>

                  <div className="mt-lg flex justify-end space-x-sm">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-neutral-200 px-md py-sm text-sm font-medium text-neutral-500 hover:bg-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                      onClick={() => setIsExportModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-secondary px-md py-sm text-sm font-medium text-white hover:bg-secondary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                      onClick={handleExportPersona}
                    >
                      Export
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreatePersonaPage;
