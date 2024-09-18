"use client";
import { useState } from "react";

const FileUpload = () => {
  const [fileInput, setFileInput] = useState(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const file = fileInput[0];
        const formData = new FormData();
        formData.append("file", file);

        fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }}
      className="flex flex-col items-center gap-5"
    >
      <div className="flex flex-col gap-3 items-center">
        <p className="text-[16px]">Upload Dataset (.csv files only)</p>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={(e) => setFileInput(e.target.files[0])}
          className="border border-dashed p-4 cursor-pointer"
        />
      </div>
      <div className="flex w-full justify-evenly">
        <button
          type="submit"
          className="upload-btn rounded-full bg-[#247022] px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#2d8829] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#247022] flex items-center justify-between transition-colors duration-300"
        >
          Upload&nbsp;
          <svg
            width="30px"
            height="30px"
            className="inline rightarrow"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
                stroke="#ebb840"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
        <button
          type="reset"
          className="reset-btn rounded-full bg-[#a40000] px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#bb3939] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a40000] flex items-center justify-between transition-colors duration-300"
        >
          Reset&nbsp;
          <svg
            fill="#EEB840"
            width="30px"
            height="30px"
            className="inline resetarrow"
            viewBox="-384 -384 2688.00 2688.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#EEB840"
            stroke-width="72.96000000000001"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default FileUpload;
