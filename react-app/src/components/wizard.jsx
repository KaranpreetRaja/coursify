import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaPlus } from "react-icons/fa";

export default function Wizard() {

  return (
    <Popup
      trigger={
        <button className="p-6 flex flex-col justify-end items-center w-60 h-72 bg-blue-400 rounded-lg transition-transform hover:scale-105 duration-500 ease-in-out">
            <FaPlus size={30} className='mb-20'/>
            <span className='text-white text-lg font-semibold'>New Course</span>
        </button>
      }
      position="center center"
      modal
      nested
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="bg-white pb-6 px-6 h-wizard rounded-t-lg flex flex-col justify-between">
          <div className="flex justify-center items-center w-full mb-4 bg-gray-200 rounded-t-lg">
            <h1 className="text-xl font-medium">Create a Course</h1>
          </div>
            <div className="flex justify-between w-full rounded-t-lg">
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Back
              </button>

              <div className="flex flex-row space-x-4">
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300"
        
                >
                  Next
                </button>
                
              </div>
            </div>
        </div>
      )}
    </Popup>
  );
};
