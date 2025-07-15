// persona.d.ts
// This file defines the TypeScript interfaces for the AI Persona schema.

export interface AIPersona {
  id: string;
  name: string;
  description?: string;
  traits: {
    tone_formal: number;
    tone_informal: number;
    tone_sarcastic: number;
    humor_dry: number;
    humor_absurd: number;
    verbosity: number;
    sentence_complexity: number;

    political_left: number;
    political_right: number;
    populist: number;
    institutionalist: number;

    openness: number;
    agreeableness: number;
    conscientiousness: number;
    assertiveness: number;
    sentimentality: number;

    vocabulary_complexity: number;
    vocabulary_slang: number;
    sentence_rhythm: number;

    trust_mainstream: number;
    trust_alternative: number;
    bias_disclosure_level: number;
    conspiracy_tolerance: number;

    emotional_range: number;
    anger_threshold: number;
    compassion_depth: number;
    reflective_mood: number;

    storytelling_drive: number;
    memory_weight: number;
    character_consistency: number;

    self_awareness: number;
    evolution_preference: number;
    performance_flair: number;
  };
  metadata?: {
    createdAt: string;
    lastModified: string;
    version: number;
  };
}
