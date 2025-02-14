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

  const [manualInput1, setManualInput1] = useState("");
  const [manualInput2, setManualInput2] = useState(""); 
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!excelFile) {
      alert("Please upload an Excel file before submitting.");
      return;
    }

    const allowedExtensions = /(\.xls|\.xlsx)$/i;
    if (!allowedExtensions.exec(excelFile.name)) {
      alert("Please upload a valid Excel file (.xls or .xlsx).");
      return;
    }
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
