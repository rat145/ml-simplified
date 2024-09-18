import FileUpload from "./FileUpload";

export default function Homepage() {
  return (
    <div className="w-full h-[100vh] p-10">
      <div className="rounded-[38px] bg-gradient-to-t from-black to-[#3533cd] text-white h-full flex flex-col justify-around items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-[58px] font-bold text-center">ML, Simplified!</h1>
          <h2 className="text-[22px] text-center">
            Effortless Data Analysis &amp; Machine Learning - No Code Required
          </h2>
        </div>
        <div>
          <svg
            width="80"
            height="95"
            viewBox="0 0 64 64"
            className="star-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--emojione-monotone"
            preserveAspectRatio="xMidYMid meet"
            fill="#fff"
            stroke="#fff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M22.625 2c0 15.834-8.557 30-20.625 30c12.068 0 20.625 14.167 20.625 30c0-15.833 8.557-30 20.625-30c-12.068 0-20.625-14.166-20.625-30"
                fill="#fff"
              ></path>
              <path
                d="M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32z"
                fill="#fff"
              ></path>
              <path
                d="M51.688 2c0 7.917-4.277 15-10.313 15c6.035 0 10.313 7.084 10.313 15c0-7.916 4.277-15 10.313-15c-6.036 0-10.313-7.083-10.313-15"
                fill="#fff"
              ></path>
            </g>
          </svg>
        </div>
        <div>
          <FileUpload />
        </div>
        <footer>
          <p>
            by&nbsp;
            <a
              className="font-semibold"
              href="https://www.linkedin.com/in/ratan-sharma2/"
            >
              Ratan Sharma&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10"
                width="10"
                viewBox="0 0 512 512"
                className="inline"
              >
                <path
                  fill="#ffffff"
                  d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"
                />
              </svg>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
