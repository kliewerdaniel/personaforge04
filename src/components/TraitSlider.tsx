import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';

interface TraitSliderProps {
  traitName: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
  tooltipContent: string;
  minLabel?: string;
  maxLabel?: string;
}

const TraitSlider: React.FC<TraitSliderProps> = ({
  traitName,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  tooltipContent,
  minLabel,
  maxLabel,
}) => {
  const displayValue = (value * 100).toFixed(0); // Convert 0-1 to 0-100 for display
  const sliderId = `slider-${traitName.replace(/\s/g, '-')}`;

  return (
    <div className="mb-lg p-sm bg-neutral-200 rounded-md shadow-sm">
      <div className="flex items-center mb-sm">
        <label htmlFor={sliderId} className="text-md font-semibold text-neutral-500 mr-sm">
          {traitName}
        </label>
        <FaInfoCircle
          className="text-neutral-400 hover:text-primary cursor-pointer"
          data-tooltip-id="trait-tooltip"
          data-tooltip-content={tooltipContent}
          data-tooltip-place="top"
        />
        <span className="ml-auto text-md font-bold text-primary-800">{displayValue}%</span>
      </div>
      <input
        type="range"
        id={sliderId}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-3 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-primary-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md"
      />
      <div className="flex justify-between text-sm text-neutral-400 mt-xs">
        <span>{minLabel || 'Min'}</span>
        <span>{maxLabel || 'Max'}</span>
      </div>
      <Tooltip id="trait-tooltip" className="z-50 max-w-xs text-sm" />
    </div>
  );
};

export default TraitSlider;
