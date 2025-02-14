"use client";

import { useState, FormEvent } from "react";

export default function SeeVisualizationPage() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const handleSubmit1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form 1 submitted with:", input1);
  };

  const handleSubmit2 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form 2 submitted with:", input2);
  };

  const handleSubmit3 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form 3 submitted with:", input3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6">See Visualization</h1>
      
      <form onSubmit={handleSubmit1} className="w-full max-w-md mb-6 bg-white/10 p-6 rounded-lg shadow-md">
        <label htmlFor="input1" className="block text-sm font-bold mb-1">
          Input Option 1
        </label>
        <input
          id="input1"
          type="text"
          placeholder="Enter first option"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-bold cursor-pointer transition"
        >
          Submit Input 1
        </button>
      </form>

      <form onSubmit={handleSubmit2} className="w-full max-w-md mb-6 bg-white/10 p-6 rounded-lg shadow-md">
        <label htmlFor="input2" className="block text-sm font-bold mb-1">
          Input Option 2
        </label>
        <input
          id="input2"
          type="text"
          placeholder="Enter second option"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-bold cursor-pointer transition"
        >
          Submit Input 2
        </button>
      </form>

      <form onSubmit={handleSubmit3} className="w-full max-w-md bg-white/10 p-6 rounded-lg shadow-md">
        <label htmlFor="input3" className="block text-sm font-bold mb-1">
          Input Option 3
        </label>
        <input
          id="input3"
          type="text"
          placeholder="Enter third option"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          className="w-full p-3 mt-1 border-none rounded-lg text-base bg-white/20 text-white outline-none transition mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg font-bold cursor-pointer transition"
        >
          Submit Input 3
        </button>
      </form>
    </div>
  );
}
