"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CardContainer from "../ui/CardContainer";
import TraitsForm from "../ui/submitData/TraitsForm";

export default function SubmitDataPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const group = searchParams.get("group") || "";
  const name = searchParams.get("name") || "";

  const [trait1, setTrait1] = useState("");
  const [trait2, setTrait2] = useState("");
  const [trait3, setTrait3] = useState("");
  const [trait4, setTrait4] = useState("");
  const [trait5, setTrait5] = useState("");


  const isSubmitDisabled =
    !trait1.trim() ||
    !trait2.trim() ||
    !trait3.trim() ||
    !trait4.trim() ||
    !trait5.trim();

  const handleTraitsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitDisabled) {
      alert("Please fill in all 5 traits before submitting.");
      return;
    }

    const traits = [trait1, trait2, trait3, trait4, trait5];

    try {
      const res = await fetch("/api/manualUpload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group, name, traits }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/result");
      } else {
        console.error("Upload error:", data);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-0 font-sans bg-black relative overflow-hidden">
      <CardContainer>
        <h2 className="text-2xl font-bold mb-5">Submit Your Traits</h2>
        <p className="mb-4 text-white">
          Group: {group} | Name: {name}
        </p>
        <TraitsForm
          trait1={trait1}
          trait2={trait2}
          trait3={trait3}
          trait4={trait4}
          trait5={trait5}
          onChangeTrait1={(e: ChangeEvent<HTMLInputElement>) => setTrait1(e.target.value)}
          onChangeTrait2={(e: ChangeEvent<HTMLInputElement>) => setTrait2(e.target.value)}
          onChangeTrait3={(e: ChangeEvent<HTMLInputElement>) => setTrait3(e.target.value)}
          onChangeTrait4={(e: ChangeEvent<HTMLInputElement>) => setTrait4(e.target.value)}
          onChangeTrait5={(e: ChangeEvent<HTMLInputElement>) => setTrait5(e.target.value)}
          onSubmit={handleTraitsSubmit}
          disabled={isSubmitDisabled}
        />
      </CardContainer>
    </div>
  );
}
