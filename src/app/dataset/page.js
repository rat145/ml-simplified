import React from "react";

export default function DatasetPage() {
  return (
    <div className="w-full h-screen p-10">
      <div className="main-container h-full">
        <h2 className="font-bold text-[28px]">iris.csv</h2>
        <div className="tab-container w-full flex">
          <div className="tab-container-left w-[20%] flex flex-col text-[18px] border-2 border-red-600">
            <button className="bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4">
              View Dataset
            </button>
            <button className="bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4">
              EDA
            </button>
            <button className="bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4">
              Data Visualization
            </button>
          </div>
          <div className="tab-container-right w-[80%] border-2 border-blue-700"></div>
        </div>
      </div>
    </div>
  );
}
