"use client";

import { useRouter } from "next/navigation";

export default function SeeVisualizationButton() {
  const router = useRouter();

  const handleClick = () => {
    console.log("Button clicked, attempting to navigate...");
    router.push("/seeVisualization");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 bg-red-500 hover:bg-red-1000 text-white font-bold py-4 px-8 text-lg rounded"
    >
      See Strengths Visualization
    </button>
  );
}
