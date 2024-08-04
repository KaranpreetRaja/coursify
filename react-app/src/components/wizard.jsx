import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaPlus } from "react-icons/fa";
import FileUpload from "./wizard-pages/fileUpload";
import Topic_Selection from "./topic_selection";
import CourseInfoEntry from "./wizard-pages/courseInfoEntry";
import { useNavigate } from 'react-router-dom';
import CourseCreationOptions from "./wizard-pages/courseCreationOptions"
import axios from 'axios';

export default function Wizard() {
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState([])
  const navigate = useNavigate()
  const [page, setPage] = useState(1);

  const handleSubmit = async () => {
    const newCourseData = new FormData();

    newCourseData.append('uid', '1234');
    newCourseData.append('session_id', '2932');

    for (const key in formData) {
      newCourseData.append(key, formData[key]);
    }

    files.forEach((file, index) => {
      newCourseData.append('files', file, file.name);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/course_config/create/create_course_material', newCourseData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('File upload failed:', error.message);
    }
  };


  const handleNext = () => {
    if (page === 3) {

    }
    else {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleBack = () => {
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  const handleCourseCreationOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  };

  const handleCourseInfoEntry = (enteredInfo) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, ...enteredInfo }
    })
  }

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles)
  }

  useEffect(() => {
    console.log(files)
  }, [files])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <Popup
      trigger={
        <button className="p-6 flex flex-col justify-end items-center w-60 h-72 bg-blue-400 rounded-lg transition-transform hover:scale-105 duration-500 ease-in-out">
          <FaPlus size={30} className='mb-20' />
          <span className='text-white text-lg font-semibold'>New Course</span>
        </button>
      }
      position="center center"
      modal
      nested
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="bg-white h-wizard rounded-t-lg flex flex-col">
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-blue-900 text-xl font-semibold mt-2 ml-4">Course Creation</h1>
            <button onClick={close} className="border-2 border-blue-600 bg-white w-10 h-10 rounded-lg relative z-10 transition-all duration-200 ease-in cursor-pointer text-3xl hover:bg-blue-600 hover:text-white">
              X
            </button>
          </div>

          <CourseCreationOptions visibility={page === 1} onChange={handleCourseCreationOptionChange} />

          <CourseInfoEntry visibility={page === 2} onChange={handleCourseInfoEntry} />
          <FileUpload visibility={page === 3} onChange={handleFileUpload} />
          {/* <Topic_Selection visibility={page === 3} /> */}

          <div className="flex justify-between w-full rounded-t-lg px-4 pb-4 mt-auto">
            <button
              onClick={handleBack}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Back
            </button>

            <div>
              <button
                onClick={handleNext}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300">
                Next
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300">
                submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};
