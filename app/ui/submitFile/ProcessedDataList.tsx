"use client";

export interface ProcessedRow {
  group: string | number;
  name: string;
  traits: string[];
}

interface ProcessedDataListProps {
  processedRows: ProcessedRow[];
}

const ProcessedDataList: React.FC<ProcessedDataListProps> = ({ processedRows }) => {
  return (
    <div>
      {processedRows.length > 0 ? (
        <ul>
          {processedRows.map((row, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold">Group:</span> {row.group} |{" "}
              <span className="font-bold">Name:</span> {row.name} |{" "}
              <span className="font-bold">Traits:</span> {row.traits.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data processed yet.</p>
      )}
    </div>
  );
};

export default ProcessedDataList;
