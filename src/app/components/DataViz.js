import { useState } from "react";

export default function DataViz({ data }) {
  const [selectedValueQ1, setSelectedValueQ1] = useState(null);

  return (
    <div className="q1 flex flex-col gap-5 w-[150px]">
      <h4 className="font-bold text-md">Select chart type</h4>
      <select
        value={selectedValueQ1}
        onChange={(e) => setSelectedValueQ1(e.target.value)}
      >
        <option value={null}>Select chart</option>
        <option value="bar">Bar chart</option>
        <option value="line">Line chart</option>
        <option value="pie">Pie chart</option>
        <option value="scatter">Scatter plot</option>
        <option value="box">Box plot</option>
        <option value="hist">Histogram</option>
        <option value="heat">Heatmap</option>
      </select>
    </div>
  );
}
