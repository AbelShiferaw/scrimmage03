"use client";

import { useState, FormEvent } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GroupTraitsPage() {
  const [groupId, setGroupId] = useState("");
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/traits?groupId=${groupId}`);
      const result = await res.json();

      if (result.error) {
        setError(result.error);
        setChartData(null);
        return;
      }

      // Prepare the data for the bar chart
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

  return (
    <div style={{ padding: "20px", color: "#333" }}>
      <h1>Group Traits Bar Graph</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Group ID:
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px", padding: "5px" }}>
          Submit
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {chartData && (
        <div style={{ maxWidth: "600px", marginTop: "20px" }}>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}
