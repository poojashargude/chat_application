import React from "react";

function ForthPage() {
  return (
    <div className="bg-gray-300 h-full border-r-2 border-black">
      <nav className="bg-green-600 w-full h-20 ">
        <div className="flex flex-row">
          <img className=" h-16 w-16 p-2 pt-3" src="/Assets/White.png" />
          <span className="text-white p-2 font-bold text-2xl">
            Shriharsh Naik
          </span>
        </div>
        <div className="text-white ml-20 -mt-5"> Hiii My Bio Is...</div>
      </nav>

      <div class="container flex mx-auto w-full">
        <input
          type="text"
          class="px-4 py-2  rounded-full outline-none w-full m-8"
          placeholder="Search or Start New Chat "
        />
      </div>

      <div class="grid grid-rows-5 grid-flow-col gap-4 bg-green-500">
        <div className=" border-b-2 border-white">
          <div className="flex flex-row">
            <img className=" h-16 w-16 p-2 pt-3" src="/Assets/White.png" />
            <span className="text-white p-2 font-bold text-2xl">
              8888888888
            </span>
          </div>
          <div className="text-white ml-20 -mt-5"> Our Recent Chat is...</div>
        </div>

        <div className="border-b-2 border-white hover:bg-violet-400 ">
          <div className="flex flex-row">
            <img className=" h-16 w-16 p-2 pt-3" src="/Assets/White.png" />
            <span className="text-white p-2 font-bold text-2xl">
              6666666666
            </span>
          </div>
          <div className="text-white ml-20 -mt-5"> Our Recent Chat is...</div>
        </div>

        <div className="border-b-2 border-white">
          <div className="flex flex-row">
            <img className=" h-16 w-16 p-2 pt-3" src="/Assets/White.png" />
            <span className="text-white p-2 font-bold text-2xl">
              4444444444
            </span>
          </div>
          <div className="text-white ml-20 -mt-5"> Our Recent Chat is...</div>
        </div>

        <div className="border-b-2 border-white">
          <div className="flex flex-row">
            <img className=" h-16 w-16 p-2 pt-3" src="/Assets/White.png" />
            <span className="text-white p-2 font-bold text-2xl">
              2222222222
            </span>
          </div>
          <div className="text-white ml-20 -mt-5"> Our Recent Chat is...</div>
        </div>

        <div className="border-b-2 border-white">
          <div className="flex flex-row">
            <img className=" h-16 w-16 p-2 pt-3" src="/Assets/White.png" />
            <span className="text-white p-2 font-bold text-2xl">
              0000000000
            </span>
          </div>
          <div className="text-white ml-20 -mt-5"> Our Recent Chat is...</div>
        </div>
      </div>
    </div>
  );
}

export default ForthPage;
