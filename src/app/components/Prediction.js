import { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

export default function Prediction({ data, columns }) {
  const [selectedModel, setSelectedModel] = useState("");
  const [model, setModel] = useState(null);
  const [y, setY] = useState("");
  const [x, setX] = useState("");
  const [rows, setRows] = useState(1);
  const [predictInput, setPredictInput] = useState(null);
  const [status, setStatus] = useState(
    "Choose the model and variables to begin model training"
  );
  const [finalOutput, setFinalOutput] = useState("");
  const parentDivRef = useRef(null);

  useEffect(() => {
    let shape = localStorage.getItem("shape").split(",");
    setRows(Number(shape[0]));
  }, []);

  useEffect(() => {
    const para = document.createElement("p");
    para.textContent = finalOutput;
    if (parentDivRef.current) {
      parentDivRef.current.appendChild(para);
    }
  }, [finalOutput]);

  useEffect(() => {
    if ((x !== "") & (y !== "")) {
      const xData = data.map((obj, index) => Number(obj[x]));
      const yData = data.map((obj, index) => Number(obj[y]));

      const createAndTrainModel = async () => {
        setStatus("Training the model...");
        //Data
        const xs = tf.tensor2d(xData, [2000, 1]);
        const ys = tf.tensor2d(yData, [2000, 1]);

        // Normalize the input `xs`
        const xsNormalized = xs.sub(xs.min()).div(xs.max().sub(xs.min())); // Scaling between 0 and 1
        console.log(xsNormalized);

        //Logistic regression model
        const logisticModel = tf.sequential();
        logisticModel.add(
          tf.layers.dense({
            units: 1,
            inputShape: [1],
            activation: "sigmoid",
            kernelInitializer: "glorotUniform",
          })
        );

        //Compile the model
        logisticModel.compile({
          optimizer: tf.train.sgd(0.01),
          loss: "binaryCrossentropy",
          metrics: ["accuracy"],
        });

        //Train the model
        await logisticModel.fit(xsNormalized, ys, {
          epochs: 200,
          callbacks: {
            onEpochEnd: (epoch, logs) =>
              console.log(`Epoch ${epoch}: loss = ${logs.loss}`),
          },
        });

        //Set the trained model to state
        setModel(logisticModel);
        setStatus("Model successfully trained. Click on the Predict button");
      };
      createAndTrainModel();
    }
  }, [x, y]);

  // Make prediction
  const predict = async (input) => {
    if (!model) return;

    const inputTensor = tf.tensor2d([Number(input)], [1, 1]);
    const prediction = model.predict(inputTensor);
    const classPred = (await prediction.data())[0] > 0.5 ? 1 : 0;

    setFinalOutput(`Prediction for ${input}: ${classPred}`);
  };

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
          <>
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
            <div className="flex flex-col gap-3 w-[300px] mt-5">
              <h4 className="font-bold text-md">
                Select feature (independent) x variable
              </h4>
              <select
                value={x}
                onChange={(e) => setX(e.target.value)}
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
            {y !== "" && x !== "" && (
              <div className="flex gap-5 mt-5">
                <div className="flex flex-col gap-3 w-[300px]">
                  <h4 className="font-bold text-md">
                    Predict {y} for how much {x}?
                  </h4>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      predict(predictInput);
                    }}
                    className="flex justify-between"
                  >
                    <input
                      type="number"
                      placeholder={`Enter ${x}`}
                      onChange={(e) => setPredictInput(e.target.value)}
                      value={predictInput}
                      className="p-1 rounded-lg"
                    />
                    <button
                      type="submit"
                      className="py-1 px-5 rounded-lg bg-gray-400"
                    >
                      Predict
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Prediction results */}
      <div
        className="prediction-right w-[70%] border border-black h-[500px] p-5 overflow-scroll"
        ref={parentDivRef}
      >
        <p className="text-red-600 font-semibold text-lg mb-5">
          Click on "Predict" button after the model is finished training!
        </p>
        <p className="text-md mb-5">
          <b>Status:</b>{" "}
          <span
            className={
              status ===
                "Model successfully trained. Click on the Predict button" &&
              "text-green-800 font-semibold"
            }
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
}
