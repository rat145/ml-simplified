import * as dfd from "danfojs";
import { useEffect, useState } from "react";

export default function EDA({ data }) {
  // data is in json format, columns is an array of column names
  const [description, setDescription] = useState("");
  const [nullCounts, setNullCounts] = useState(null);
  const [shape, setShape] = useState("");
  const [allColumns, setAllColumns] = useState("");
  const [unique, setUnique] = useState("");

  // Function to detect and remove double quotes around numbers
  function processUploadedData(uploadedData) {
    // Step 1: Load the user-uploaded JSON data into a DataFrame
    const df = new dfd.DataFrame(uploadedData);

    // Step 2: Iterate through each column and convert string-wrapped numbers to actual numbers
    df.columns.forEach((col) => {
      // Try to parse each column's value and check if it's numeric
      const columnData = df[col].values.map((val) => {
        if (typeof val === "string") {
          // Remove quotes and check if the value is a numeric string
          const parsedVal = parseFloat(val);
          if (!isNaN(parsedVal)) {
            return parsedVal; // Convert to number if it's a numeric string
          }
        }
        return val; // Keep the value as-is if it's not a numeric string
      });

      // Update the column with cleaned-up numeric values
      df.addColumn(col, columnData);
    });

    return df;
  }

  useEffect(() => {
    const df = processUploadedData(data);

    setDescription(df.describe().toString());

    // Initialize an object to hold null counts
    const counts = {};
    // Iterate over each column in the DataFrame
    df.columns.forEach((col) => {
      // Access the column using bracket notation
      const columnData = df[col].values;
      // Count nulls using filter
      counts[col] = columnData.filter((value) => value === null).length;
    });
    // Set the null counts in the state
    if (counts) setNullCounts(counts);

    setShape(df.shape.toString());
    localStorage.setItem("shape", df.shape.toString());

    setAllColumns(df.columns.toString());

    setUnique(df.nUnique(0).toString());
  }, []);

  return (
    <div className="description-container flex flex-col gap-5">
      <h3 className="text-lg font-bold">Columns in the dataset</h3>
      <div className="text-sm bg-white py-2 pl-2 rounded-lg">
        <pre>{allColumns}</pre>
      </div>
      <h3 className="text-lg font-bold">Null Count</h3>
      <div className="text-sm bg-white py-2 pl-2 rounded-lg">
        {nullCounts ? (
          <ul>
            {Object.entries(nullCounts).map(([column, count]) => (
              <li key={column}>
                {column}: {count}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm mb-5" bg-white mb-5>
            Loading...
          </p>
        )}
      </div>
      <h3 className="text-lg font-bold">Shape (rows, columns)</h3>
      <div className="text-sm bg-white py-2 pl-2 rounded-lg">
        <pre>{shape}</pre>
      </div>
      <h3 className="text-lg font-bold">Descriptive Statistics</h3>
      <div className="text-xs bg-white py-2 pl-2 rounded-lg">
        <pre>{description}</pre>
      </div>
      <h3 className="text-lg font-bold">Number of unique values</h3>
      <div className="text-xs bg-white py-2 pl-2 rounded-lg">
        <pre>{unique}</pre>
      </div>
    </div>
  );
}
