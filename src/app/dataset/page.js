"use client";

export default function DatasetPage() {
  const handleTabButtonClick = (e) => {
    console.log(e.target.classList);
  }

  return (
    <div className="w-full h-screen p-10">
      <div className="main-container h-full">
        <h2 className="font-bold text-[28px]">iris.csv</h2>
        <div className="tab-container w-full flex mt-5 min-h-[90%]">
          <div className="tab-container-left w-[20%] flex flex-col text-[18px] gap-10">
            <button 
              className="rounded-md bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4" 
              onClick={handleTabButtonClick}
            >
              View Dataset
            </button>
            <button className="rounded-md bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4">
              EDA
            </button>
            <button className="rounded-md bg-gradient-to-t from-black to-[#3533cd] text-white text-left px-7 py-4">
              Data Visualization
            </button>
          </div>
          <div className="tab-container-right w-[80%] px-5">
            <div className="tab-content-container bg-gray-300 rounded-3xl py-5 px-10 h-full">
              <h2>Hello world</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
