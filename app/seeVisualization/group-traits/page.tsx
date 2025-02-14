"use client";

import { useState, useEffect, FormEvent } from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import BackgroundCanvas from "../../ui/BackgroundCanvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import router from "next/router";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GroupTraitsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryGroupId = searchParams.get("number");

  const [groupId, setGroupId] = useState(queryGroupId || "");
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (id: string) => {
    try {
      const res = await fetch(`/api/traits?groupId=${id}`);
      const result = await res.json();

      if (result.error) {
        setError(result.error);
        setChartData(null);
        return;
      }

      const labels = result.data.map((row: any) => row.trait);
      const counts = result.data.map((row: any) => row.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Trait Count",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (queryGroupId) {
      fetchData(queryGroupId);
    }
  }, [queryGroupId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    fetchData(groupId);
  };

  return (
    <div className="flex flex-col items-center justify-start bg-black text-white min-h-screen p-4 relative">
      <BackgroundCanvas />
      <h1>All Traits in the Group</h1>
      <button
        className="absolute top-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl p-8 rounded-lg shadow-xl mt-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Group Traits Bar Graph
        </h1>
        

        {!queryGroupId && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8">
            <label className="text-xl mb-4">
              Group ID:
              <input
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="ml-2 p-2 border border-gray-300 rounded bg-white text-black"
              />
            </label>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </form>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {chartData && (
          <div className="w-full mt-8">
            <Bar data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
