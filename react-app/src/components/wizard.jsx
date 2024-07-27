import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaPlus } from "react-icons/fa";
import File_Upload from "./file_upload";
import Topic_Selection from "./topic_selection";
import Course_Info from "./course_info";

export default function Wizard() {
  const [courseData, setCourseData] = useState(null)
  const [page, setPage] = useState(1);

  const handleNext = () => {
    if (page === 3){

    }
    else{
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleBack = () => {
    if (page !== 1){
      setPage((prevPage) => prevPage - 1)
    }
  }

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
        <div className="bg-white h-wizard rounded-t-lg flex flex-col justify-between">
          <div className="w-full flex flex-row justify-between">
              <h1 className="text-blue-900 text-xl font-semibold mt-2 ml-4">Course Creation</h1>
              <button onClick={close} className="border-2 border-blue-600 bg-white w-10 h-10 rounded-lg relative z-10 transition-all duration-200 ease-in cursor-pointer text-3xl hover:bg-blue-600 hover:text-white">
                X
              </button>
          </div>
          
          <Course_Info visibility={page === 1}/>
          <File_Upload visibility={page === 2}/>
          <Topic_Selection visibility={page === 3}/>
          
          <div className="flex justify-between w-full rounded-t-lg px-4 pb-4">
            <button 
              onClick={handleBack}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Back
            </button>

            <button
              onClick={handleNext}
              className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300">
              Next
            </button>
          </div>

        </div>
      )}
    </Popup>
  );
};
