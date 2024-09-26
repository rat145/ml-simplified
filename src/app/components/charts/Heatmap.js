import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import * as ss from "simple-statistics";

export default function Heatmap({ data }) {
  const [heatmapData, setHeatmapData] = useState({ x: [], y: [], z: [] });

  useEffect(() => {
    // Step 1: Extract numeric columns from the data
    let numericData = data.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => !isNaN(Number(value))) // Filter numeric values
      )
    );

    // Step 2: Convert numeric values to actual numbers for all columns
    numericData = numericData.map((obj) => {
      Object.keys(obj).forEach((key) => {
        obj[key] = Number(obj[key]); // Convert each value to a number
      });
      return obj;
    });

    console.log(numericData);

    const columns = Object.keys(numericData[0]);

    // Step 2: Prepare matrix of values for each column
    const columnData = columns.map((col) => numericData.map((row) => row[col]));

    // Step 3: Calculate correlation matrix
    const correlationMatrix = [];
    for (let i = 0; i < columns.length; i++) {
      const rowCorrelations = [];
      for (let j = 0; j < columns.length; j++) {
        const correlation = ss.sampleCorrelation(columnData[i], columnData[j]);
        rowCorrelations.push(correlation);
      }
      correlationMatrix.push(rowCorrelations);
    }

    // Step 4: Set heatmap data
    setHeatmapData({
      x: columns, // Column names for x-axis
      y: columns, // Column names for y-axis
      z: correlationMatrix, // Correlation values (2D array)
    });
  }, [data]);

  return (
    <Plot
      data={[
        {
          z: heatmapData.z, // Correlation values (2D array)
          x: heatmapData.x, // Column names for the x-axis
          y: heatmapData.y, // Column names for the y-axis
          type: "heatmap",
          colorscale: "YlGnBu", // Color scheme for heatmap
        },
      ]}
      layout={{
        title: "Correlation Heatmap",
        width: 740,
        height: 570,
      }}
    />
  );
}
