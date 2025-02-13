"use client";
import { FormEvent, ChangeEvent } from "react";

interface ManualDataFormProps {
  manualInput1: string;
  manualInput2: string;
  onInputChange1: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputChange2: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ManualDataForm = ({
  manualInput1,
  manualInput2,
  onInputChange1,
  onInputChange2,
  onSubmit,
}: ManualDataFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label className="block text-left text-sm font-bold mb-1">
        First Data
      </label>
      <input
        type="text"
        placeholder="Enter first data"
        value={manualInput1}
        onChange={onInputChange1}
        className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-2"
      />
      <label className="block text-left text-sm font-bold mb-1">
        Second Data
      </label>
      <input
        type="text"
        placeholder="Enter second data"
        value={manualInput2}
        onChange={onInputChange2}
        className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-5"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-bold cursor-pointer transition"
      >
        Submit Data
      </button>
    </form>
  );
};

export default ManualDataForm;
