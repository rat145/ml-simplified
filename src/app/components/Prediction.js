import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function Prediction({ data, columns }) {
  const [selectedModel, setSelectedModel] = useState("");
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  return (
    <div className="flex gap-5">
      <div className="prediction-left w-[30%]">
        <div className="q1 flex flex-col gap-3 w-[300px] mb-5">
          <h4 className="font-bold text-md">
            Choose an algorithm to predict values
          </h4>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="p-1 rounded-lg"
          >
            <option value="" className="text-gray-500">
              Select model
            </option>
            <option value="logistic">Logistic Regression</option>
          </select>
        </div>
        {/* Scatter plot column selection */}
        {selectedModel === "logistic" && (
          <div className="flex gap-5">
            <div className="flex flex-col gap-3 w-[300px]">
              <h4 className="font-bold text-md">
                Select target (dependent) y variable
              </h4>
              <select
                value={y}
                onChange={(e) => setY(e.target.value)}
                className="p-1 rounded-lg"
              >
                <option value="" className="text-gray-500">
                  Select column
                </option>
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
      {/* Prediction results */}
      <div className="prediction-right w-[70%]"></div>
    </div>
  );
}
