"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import BackgroundCanvas from "./ui/BackgroundCanvas";
import WelcomeText from "./ui/WelcomeText";
import CardContainer from "./ui/CardContainer";
import FileUploadForm from "./ui/FileUploadForm";
import ManualDataForm from "./ui/ManualDataForm";
import SeeVisualizationButton from "./ui/SeeVisualizationButton";

export default function Home() {
  const router = useRouter();

  const [manualInput1, setManualInput1] = useState("");
  const [manualInput2, setManualInput2] = useState("");

  const handleGoToUploadPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/submitFile");
  };

  const handleManualSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const groupNumber = Number(manualInput1);
    if (!manualInput1 || isNaN(groupNumber) || !Number.isInteger(groupNumber)) {
      alert("Please enter a valid group number (an integer).");
      return;
    }
    if (!manualInput2.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    router.push(
      `/submitData?group=${encodeURIComponent(manualInput1)}&name=${encodeURIComponent(manualInput2)}`
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-0 font-sans bg-black relative overflow-hidden">
      <BackgroundCanvas />
      <WelcomeText />
      <CardContainer>
        <p className="text-sm text-white/70 mb-5">
          Choose how you want to enter data:
        </p>

        <FileUploadForm 
          onSubmit={handleGoToUploadPage} 
          redirectOnly={true} 
        />

        <div className="text-center text-sm text-white/70 my-5">or</div>

        <ManualDataForm
          manualInput1={manualInput1}
          manualInput2={manualInput2}
          onInputChange1={(e: ChangeEvent<HTMLInputElement>) => setManualInput1(e.target.value)}
          onInputChange2={(e: ChangeEvent<HTMLInputElement>) => setManualInput2(e.target.value)}
          onSubmit={handleManualSubmit}
        />
        <SeeVisualizationButton onClick={() => router.push("/seeVisualization")} />
      </CardContainer>
      
    </div>
  );
}
