import Plot from "react-plotly.js";

export default function Scatter({ xcol, ycol }) {
  return (
    <Plot
      data={[
        {
          x: xcol,
          y: ycol,
          type: "scatter",
          mode: "markers",
          marker: { color: "red" },
        },
      ]}
      layout={{ width: 720, height: 570, title: "Scatter Plot" }}
    />
  );
}
