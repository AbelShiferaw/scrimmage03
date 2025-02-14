// ui/visualization/topFive/BarGraph.tsx
"use client";

import React from "react";

interface TraitData {
  trait: string;
  count: number;
}

interface BarGraphProps {
  data: TraitData[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full items-end justify-around h-64 border-l border-b border-gray-600">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            title={`${d.trait}: ${d.count} occurrences`}
          >
            <div
              className="w-12 bg-blue-500 hover:bg-blue-600 transition-all"
              style={{
                height: `${(d.count / maxCount) * 100}%`,
                minHeight: "20px",
              }}
            ></div>
            <span className="mt-2 text-sm">{d.trait}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarGraph;
