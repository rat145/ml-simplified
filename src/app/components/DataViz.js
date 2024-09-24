import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Dynamically import Plotly-based component with SSR disabled
const Scatter = dynamic(() => import("./charts/Scatter"), {
  ssr: false, // Disable server-side rendering for this component
});
const Histogram = dynamic(() => import("./charts/Histogram"), {
  ssr: false,
});

export default function DataViz({ data, columns }) {
  const [selectedValueQ1, setSelectedValueQ1] = useState("");
  const [selectedXCol, setSelectedXCol] = useState("");
  const [selectedYCol, setSelectedYCol] = useState("");
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [histXData, setHistXData] = useState([]);

  useEffect(() => {
    if (selectedXCol !== "" && selectedYCol !== "") {
      const temp_arrayX = [];
      const temp_arrayY = [];
      data.map((item, index) => {
        temp_arrayX.push(item[selectedXCol]);
        temp_arrayY.push(item[selectedYCol]);
      });
      setXData(temp_arrayX);
      setYData(temp_arrayY);
    }
    if (selectedXCol !== "" && selectedYCol === "") {
      const temp_arrayXhist = [];
      data.map((item, index) => {
        temp_arrayXhist.push(item[selectedXCol]);
      });
      setHistXData(temp_arrayXhist);
    }
  }, [selectedXCol, selectedYCol]);

  return (
    <div className="flex gap-5">
      <div className="dataviz-left w-[30%]">
        <div className="q1 flex flex-col gap-3 w-[150px] mb-5">
          <h4 className="font-bold text-md">Select chart type</h4>
          <select
            value={selectedValueQ1}
            onChange={(e) => setSelectedValueQ1(e.target.value)}
          >
            <option value="">Select chart</option>
            <option value="scatter">Scatter plot</option>
            <option value="hist">Histogram</option>
            <option value="heat">Heatmap</option>
            <option value="bar">Bar chart</option>
            <option value="line">Line chart</option>
            <option value="pie">Pie chart</option>
            <option value="box">Box plot</option>
          </select>
        </div>
        {/* Scatter plot column selection */}
        {selectedValueQ1 === "scatter" && (
          <div className="flex gap-5">
            <div className="flex flex-col gap-3 w-[150px]">
              <h4 className="font-bold text-md">Select value for x</h4>
              <select
                value={selectedXCol}
                onChange={(e) => setSelectedXCol(e.target.value)}
              >
                <option value="">Select column</option>
                {columns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 w-[150px]">
              <h4 className="font-bold text-md">Select value for y</h4>
              <select
                value={selectedYCol}
                onChange={(e) => setSelectedYCol(e.target.value)}
              >
                <option value="">Select column</option>
                {columns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {/* Histogram column selection */}
        {selectedValueQ1 === "hist" && (
          <div className="flex gap-5">
            <div className="flex flex-col gap-3 w-[150px]">
              <h4 className="font-bold text-md">Select value for x</h4>
              <select
                value={selectedXCol}
                onChange={(e) => setSelectedXCol(e.target.value)}
              >
                <option value="">Select column</option>
                {columns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      {/* Visualizations */}
      <div className="dataviz-right w-[70%]">
        {selectedValueQ1 === "scatter" &&
          selectedXCol !== "" &&
          selectedYCol !== "" && <Scatter xcol={xData} ycol={yData} />}
        {selectedValueQ1 === "hist" &&
          selectedXCol !== "" &&
          selectedYCol === "" && <Histogram xcol={histXData} />}
      </div>
    </div>
  );
}
