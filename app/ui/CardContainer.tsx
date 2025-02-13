"use client";
import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-lg shadow-md text-center w-[380px] text-white border border-white/30 relative z-20">
      {children}
    </div>
  );
};

export default CardContainer;
