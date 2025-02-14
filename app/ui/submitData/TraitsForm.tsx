"use client";

import { ChangeEvent, FormEvent } from "react";

export interface TraitsFormProps {
  trait1: string;
  trait2: string;
  trait3: string;
  trait4: string;
  trait5: string;
  onChangeTrait1: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTrait2: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTrait3: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTrait4: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTrait5: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

const TraitsForm = ({
  trait1,
  trait2,
  trait3,
  trait4,
  trait5,
  onChangeTrait1,
  onChangeTrait2,
  onChangeTrait3,
  onChangeTrait4,
  onChangeTrait5,
  onSubmit,
  disabled = false, 
}: TraitsFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-left text-sm font-bold mb-1">Trait 1</label>
        <input
          type="text"
          placeholder="Enter trait 1"
          value={trait1}
          onChange={onChangeTrait1}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-sm font-bold mb-1">Trait 2</label>
        <input
          type="text"
          placeholder="Enter trait 2"
          value={trait2}
          onChange={onChangeTrait2}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-sm font-bold mb-1">Trait 3</label>
        <input
          type="text"
          placeholder="Enter trait 3"
          value={trait3}
          onChange={onChangeTrait3}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-sm font-bold mb-1">Trait 4</label>
        <input
          type="text"
          placeholder="Enter trait 4"
          value={trait4}
          onChange={onChangeTrait4}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition"
        />
      </div>
      <div className="mb-6">
        <label className="block text-left text-sm font-bold mb-1">Trait 5</label>
        <input
          type="text"
          placeholder="Enter trait 5"
          value={trait5}
          onChange={onChangeTrait5}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition"
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className={`w-full p-3 rounded-lg text-lg font-bold cursor-pointer transition ${
          disabled
            ? "bg-gray-500"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Submit Traits
      </button>
    </form>
  );
};

export default TraitsForm;
