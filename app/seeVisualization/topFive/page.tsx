// pages/topFive.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CardContainer from "@/app/ui/CardContainer";
import BarGraph from "@/app/ui/visualization/topFive/BarGraph";

interface TraitData {
  trait: string;
  count: number;
}

export default function TopFivePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Retrieve the encoded topTraits from the URL.
  const encodedTopTraits = searchParams.get("topTraits") || "";
  const [topTraits, setTopTraits] = useState<TraitData[]>([]);

  useEffect(() => {
    try {
      if (encodedTopTraits) {
        const parsed = JSON.parse(decodeURIComponent(encodedTopTraits));
        setTopTraits(parsed);
      }
    } catch (err) {
      console.error("Error parsing topTraits:", err);
    }
  }, [encodedTopTraits]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <CardContainer>
        <h1 className="text-3xl font-bold mb-6">Top 5 Traits</h1>
        <BarGraph data={topTraits} />
        <button
          className="mt-6 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          onClick={() => router.back()}
        >
          Back
        </button>
      </CardContainer>
    </div>
  );
}
