"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import BackgroundCanvas from "./ui/BackgroundCanvas";
import WelcomeText from "./ui/WelcomeText";
import CardContainer from "./ui/CardContainer";
import FileUploadForm from "./ui/FileUploadForm";
import ManualDataForm from "./ui/ManualDataForm";

export default function Home() {
  const router = useRouter();

  // States for manual input and file upload
  const [manualInput1, setManualInput1] = useState("");
  const [manualInput2, setManualInput2] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setExcelFile(e.target.files[0]);
    }
  };

  // When the file form is submitted, navigate to '/result'
  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/result");
  };

  // When the manual data form is submitted, navigate to '/insert-data'
  const handleManualSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/insert-data");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-0 font-sans bg-black relative overflow-hidden">
      <BackgroundCanvas />
      <WelcomeText />
      <CardContainer>
        <p className="text-sm text-white/70 mb-5">
          Upload an Excel file or enter data manually
        </p>
        <FileUploadForm
          excelFile={excelFile}
          onFileChange={handleFileChange}
          onSubmit={handleFileSubmit}
        />
        <div className="text-center text-sm text-white/70 mb-5">or</div>
        <ManualDataForm
          manualInput1={manualInput1}
          manualInput2={manualInput2}
          onInputChange1={(e) => setManualInput1(e.target.value)}
          onInputChange2={(e) => setManualInput2(e.target.value)}
          onSubmit={handleManualSubmit}
        />
      </CardContainer>
    </div>
  );
}
