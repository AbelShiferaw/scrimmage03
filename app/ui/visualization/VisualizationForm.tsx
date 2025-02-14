// ui/VisualizationForm.tsx
"use client";

import React, { ChangeEvent, FormEvent } from "react";

export interface VisualizationFormProps {
  label: string;
  inputId: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}

const VisualizationForm: React.FC<VisualizationFormProps> = ({
  label,
  inputId,
  placeholder,
  value,
  onChange,
  onSubmit,
  buttonText,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mb-6 bg-white/10 p-6 rounded-lg shadow-md">
      <label htmlFor={inputId} className="block text-sm font-bold mb-1">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-bold cursor-pointer transition"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default VisualizationForm;
