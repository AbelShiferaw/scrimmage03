"use client";

import { useRouter } from "next/navigation";
import BackgroundCanvas from "./ui/BackgroundCanvas";
import WelcomeText from "./ui/WelcomeText";
import CardContainer from "./ui/CardContainer";
import ManualDataForm from "./ui/ManualDataForm";
import FileUploadForm from "./ui/FileUploadForm"; 

export default function Home() {
  const router = useRouter();

  const handleGoToUploadPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/submitFile"); 
  };

  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/submitData"); 
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
          manualInput1=""
          manualInput2=""
          onInputChange1={() => {}}
          onInputChange2={() => {}}
          onSubmit={handleManualSubmit}
        />
      </CardContainer>
    </div>
  );
}
