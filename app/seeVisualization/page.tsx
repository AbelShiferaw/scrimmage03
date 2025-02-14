// pages/seeVisualization.tsx
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
  const [groupInput, setGroupInput] = useState("");
  const [input3, setInput3] = useState("");

  const handleSubmit1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form 1 submitted with:", input1);
  };

  const handleSubmit2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const groupNumber = Number(groupInput);
    if (!groupInput || isNaN(groupNumber) || !Number.isInteger(groupNumber)) {
      alert("Please enter a valid group number (an integer).");
      return;
    }
    try {
      const res = await fetch("/api/topFive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: groupNumber }),
      });
      const data = await res.json();
      if (data.topTraits) {
        // Encode the topTraits data as a URI component.
        const encodedTopTraits = encodeURIComponent(JSON.stringify(data.topTraits));
        router.push(`/seeVisualization/topFive?topTraits=${encodedTopTraits}`);
      } else {
        console.error("Error fetching top traits:", data);
      }
    } catch (error) {
      console.error("Error fetching top traits:", error);
    }
  };

  const handleSubmit3 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form 3 submitted with:", input3);
    router.push(`/group-traits?number=${input3}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 h-screen">
      <BackgroundCanvas />
      <WelcomeText />
      <h1 className="text-3xl font-bold mb-6">See Visualization</h1>
      <button
        className="absolute top-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        onClick={() => router.back()}
      >
        Back
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
          inputId="groupInput"
          placeholder="Enter group number"
          value={groupInput}
          onChange={(e) => setGroupInput(e.target.value)}
          onSubmit={handleSubmit2}
          buttonText="Show Top Traits"
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
