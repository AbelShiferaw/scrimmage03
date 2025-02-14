"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import CardContainer from "../ui/CardContainer";
import VisualizationForm from "../ui/visualization/VisualizationForm";
import BackgroundCanvas from "../ui/BackgroundCanvas";
import WelcomeText from "../ui/WelcomeText"; 

export default function SeeVisualizationPage() {
  const router = useRouter();

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 h-screen">
      <BackgroundCanvas />
      <WelcomeText />

      <h1 className="text-3xl font-bold mb-6">See Visualization</h1>
      <button
        className="absolute top-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        onClick={() => router.back()}
        > Back
      </button>
      <CardContainer>
        <VisualizationForm
          label="Input Option 1"
          inputId="input1"
          placeholder="Enter first option"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          onSubmit={handleSubmit1}
          buttonText="Person Name"
        />

        <VisualizationForm
          label="Group Top 5"
          inputId="input2"
          placeholder="Enter Group Number"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          onSubmit={handleSubmit2}
          buttonText="Get Visualization"
        />

        <VisualizationForm
          label="All Group Traits"
          inputId="input3"
          placeholder="Enter Group Number"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          onSubmit={handleSubmit3}
          buttonText="Get Visualization"
        />
      </CardContainer>
    </div>
  );
}
