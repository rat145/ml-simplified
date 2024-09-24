import Plot from "react-plotly.js";

export default function Histogram({ xcol }) {
  return (
    <Plot
      data={[
        {
          x: xcol,
          type: "histogram",
        },
      ]}
      layout={{ width: 720, height: 570, title: "Histogram" }}
    />
  );
}
