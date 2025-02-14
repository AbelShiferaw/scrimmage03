"use client";

import React from "react";

interface SeeVisualizationButtonProps {
  onClick: () => void;
}

const SeeVisualizationButton: React.FC<SeeVisualizationButtonProps> = ({ onClick }) => {
  return (
    <button
      className="mt-6 bg-red-500 text-white font-bold py-4 px-8 text-lg rounded transition-colors duration-300 hover:bg-red-600"
      onClick={onClick}
    >
      See Visualization
    </button>
  );
};

export default SeeVisualizationButton;
