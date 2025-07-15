import React, { useState } from 'react';
import type { AIPersona } from '../types/persona';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js/lib/core';
import jsonLanguage from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', jsonLanguage);
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

interface PersonaPreviewCardProps {
  personaData: AIPersona;
}

const PersonaPreviewCard: React.FC<PersonaPreviewCardProps> = ({ personaData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-neutral-50 p-5 rounded-lg shadow-md mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-lg font-semibold">Persona Preview:</h3>
        <button
          aria-label="Toggle persona JSON details"
          className="p-2 hover:bg-neutral-200 rounded-md transition"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </button>
      </div>
      <div className={`transition-max-h duration-300 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden`}>
        <SyntaxHighlighter
          language="json"
          style={atomOneDark}
          customStyle={{
            backgroundColor: 'var(--tw-colors-neutral-200)',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            maxHeight: '1500px', // Fixed height for scrollability
            overflowY: 'auto',
          }}
          wrapLines={true}
          lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
        >
          {JSON.stringify(personaData, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default PersonaPreviewCard;
