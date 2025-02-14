"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import CardContainer from "../ui/CardContainer";
import TraitsForm from "../ui/submitData/TraitsForm";

export default function InsertDataPage() {
  const router = useRouter();

  const [trait1, setTrait1] = useState("");
  const [trait2, setTrait2] = useState("");
  const [trait3, setTrait3] = useState("");
  const [trait4, setTrait4] = useState("");
  const [trait5, setTrait5] = useState("");

  const handleTraitsSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Traits submitted:", { trait1, trait2, trait3, trait4, trait5 });
    router.push("/result");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-0 font-sans bg-black relative overflow-hidden">
      <CardContainer>
        <h2 className="text-2xl font-bold mb-5">Submit Your Traits</h2>
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
        />
      </CardContainer>
    </div>
  );
}
