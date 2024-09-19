"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import Link from "next/link";

const FileUpload = () => {

  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [buttonText, setButtonText] = useState("Upload");
  const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

  useEffect(() => {
    if (isUploading) {
      setButtonText("Uploading..");
      const timer = setTimeout(() => {
        setButtonText("Next");
        setIsUploading(false);
        setIsUploaded(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isUploaded) {
      setButtonText("Next");
    }
  }, [isUploading]);

  const onFileChangeHandler = (event) => {
    setIsUploading(true);
    const csvFile = event.target.files[0];

    Papa.parse(csvFile, {
      skipEmptyLines: true,
      header: true,
      complete: function(results) {
        console.log("Finished:", results.data);
      }
    });
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col gap-3 items-center">
        <p className="text-[16px]">Upload Dataset (*<span className="text-[#2d8829] font-bold">csv, xls, </span> etc)</p>
        <input
          type="file"
          id="csvFileSelector"
          className="border border-dashed p-4 cursor-pointer"
          accept={acceptableCSVFileTypes}
          onChange={onFileChangeHandler}
        />
      </div>
      <div className="flex w-full justify-evenly">
        <Link href={isUploaded ? "/dataset" : "/"}>
        <button
          type="submit"
          className={`${isUploading && "upload-btn"} rounded-full bg-[#247022] ${isUploaded? "px-8 py-2.5" : "px-3.5 py-1"} text-sm font-semibold text-white shadow-sm hover:bg-[#2d8829] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#247022] flex items-center justify-between transition-colors duration-300`}
        >
          {buttonText}&nbsp;
          {!isUploaded && (
            <svg
            fill="#EEB840"
            width="30px"
            height="30px"
            className={`inline ${isUploading && "resetarrow"}`}
            viewBox="-384 -384 2688.00 2688.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#EEB840"
            strokeWidth="72.96000000000001"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                fillRule="evenodd"
              ></path>
            </g>
          </svg>
          )}
        </button>
        </Link>
      </div>
    </div>
  );
};

export default FileUpload;
