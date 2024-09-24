"use client";
import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import EDA from "../components/EDA";
import DataViz from "../components/DataViz";

export default function DatasetPage() {
  const [currentBtnId, setCurrentBtnId] = useState("btn1");
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [columnNames, setColumnNames] = useState([]); // Track column names as state
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    setIsDataLoading(true);
    const savedData = localStorage.getItem("csvData");
    setFileName(localStorage.getItem("csvFileName"));
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // console.log("Parsed Data:", parsedData); // Check data structure
        setData(Array.isArray(parsedData) ? parsedData : []);
        // Update column names based on the first item in parsedData
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setColumnNames(Object.keys(parsedData[0]));
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        setData([]); // Fallback to an empty array in case of an error
      } finally {
        setIsDataLoading(false);
      }
    } else {
      setIsDataLoading(false);
    }
  }, []); // Only run on component mount

  const handleTabButtonClick = (e) => {
    setCurrentBtnId(e.target.id); // Updated to use id directly
  };

  // Define columns for the table using useMemo
  const columns = useMemo(() => {
    return columnNames.map((col) => ({
      Header: col,
      accessor: col,
    }));
  }, [columnNames]); // Recompute only when columnNames changes

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-full h-screen p-10">
      <div className="main-container h-full">
        <h2 className="font-bold text-[28px]">{fileName}</h2>
        <div className="tab-container w-full flex mt-5 min-h-[90%]">
          <div className="tab-container-left w-[20%] flex flex-col text-[18px] gap-10">
            <button
              className={`rounded-md bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4 ${
                currentBtnId == "btn1" && "activeBtn"
              }`}
              id="btn1"
              onClick={handleTabButtonClick}
            >
              View Dataset
            </button>
            <button
              className={`rounded-md bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4 ${
                currentBtnId == "btn2" && "activeBtn"
              }`}
              id="btn2"
              onClick={handleTabButtonClick}
            >
              EDA
            </button>
            <button
              className={`rounded-md bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4 ${
                currentBtnId == "btn3" && "activeBtn"
              }`}
              id="btn3"
              onClick={handleTabButtonClick}
            >
              Data Visualization
            </button>
          </div>
          <div className="tab-container-right w-[80%] px-5">
            <div className="tab-content-container bg-gray-300 rounded-3xl py-5 px-10 h-full">
              {isDataLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                </div>
              ) : (
                currentBtnId == "btn1" &&
                data.length > 0 && (
                  <div className="overflow-x-auto border border-gray-300">
                    <div className="overflow-y-auto max-h-[600px]">
                      <table
                        {...getTableProps()}
                        className="min-w-full bg-white border border-gray-300"
                      >
                        <thead className="bg-gray-100">
                          {headerGroups.map((headerGroup) => (
                            <tr
                              {...headerGroup.getHeaderGroupProps()}
                              className="border-b"
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps()}
                                  className="px-4 py-2 text-left border-r font-semibold"
                                >
                                  {column.render("Header")}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {rows.map((row) => {
                            prepareRow(row);
                            return (
                              <tr
                                {...row.getRowProps()}
                                className="border-b hover:bg-gray-50"
                              >
                                {row.cells.map((cell) => (
                                  <td
                                    {...cell.getCellProps()}
                                    className="px-4 py-2 border-r"
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}
              {currentBtnId == "btn2" && <EDA data={data} />}
              {currentBtnId == "btn3" && <DataViz data={data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
