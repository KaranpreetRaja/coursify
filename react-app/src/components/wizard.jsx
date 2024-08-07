import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaPlus } from "react-icons/fa";
import FileUpload from "./wizard-pages/fileUpload";
import TopicSelection from "./wizard-pages/topicSelection";
import CourseInfoEntry from "./wizard-pages/courseInfoEntry";
import { useNavigate } from 'react-router-dom';
import CourseCreationOptions from "./wizard-pages/courseCreationOptions"
import axios from 'axios';
import LoadingScreen from "./loading";

export default function Wizard({handleCourseCreation}) {
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState([])
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const session_id = window.localStorage.getItem('session_id');
  const uid = window.localStorage.getItem('uid');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [generatedTopics, setGeneratedTopics] = useState([]);
  const [course_id, setCourseId] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === "uploadedDocuments") {
      createCourseWithDocuments();
    }
    else {
      createCourseWithSearch();
    }
  };

  const createCourseWithDocuments = async () => {
    setIsLoading(true)

    const newCourseData = new FormData();

    newCourseData.append('uid', uid);
    newCourseData.append('session_id', session_id);

    for (const key in formData) {
      newCourseData.append(key, formData[key]);
    }

    files.forEach((file, index) => {
      newCourseData.append('files', file, file.name);
    });

    // newCourseData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    // console.log(selectedOption)
    await sleep(2000)

    try {
      const response = await axios.post('http://localhost:8000/api/course_config/create/create_course_topics', newCourseData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      setCourseId(response.data.course_id)
      setGeneratedTopics(response.data.topics)
      setPage(4)
    } catch (error) {
      console.error('File upload failed:', error);
    }

    setIsLoading(false)
  }

  const createCourseWithSearch = async () => {
    setIsLoading(true)
    const newCourseData = new FormData();

    newCourseData.append('uid', uid);
    newCourseData.append('session_id', session_id);

    for (const key in formData) {
      newCourseData.append(key, formData[key]);
    }

    // newCourseData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    await sleep(2000)
 
    try {
      const response = await axios.post('http://localhost:8000/api/course_config/create/create_course_topics', newCourseData, {
      });
      setPage(4)
      setCourseId(response.data.course_id)
      setGeneratedTopics(response.data.topics)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('File upload failed:', error);
    }

    setIsLoading(false)
  }

  const setCourseTopics = async () => {
    const courseTopics = new FormData();

    courseTopics.append('uid', uid);
    courseTopics.append('session_id', session_id);
    courseTopics.append('course_id', course_id)
    courseTopics.append('topics', JSON.stringify(selectedTopics))

    courseTopics.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/course_config/create/set_course_topics', courseTopics);
      handleCourseCreation(course_id, formData.course_name, formData.course_description)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  }

  const handleNext = () => {
    if (page === 3) {
      handleSubmit();
    }
    // else if (page === 4) {
    //   setCourseTopics();
    // }
    else {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleBack = () => {
    if (page > 1 || page !== 4) {
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

  const handleTopicChange = (newSelectedTopics) => {
    setSelectedTopics(newSelectedTopics);
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // useEffect(() => {
  //   console.log(files)
  // }, [files])

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  useEffect(() => {
    console.log(selectedTopics)
  }, [selectedTopics])

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
          <LoadingScreen isLoading={isLoading}/>
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-blue-900 text-xl font-semibold mt-2 ml-4">Course Creation</h1>
            <button onClick={() => {
              setPage(1)
              close()
            }}
              className="border-2 border-blue-600 bg-white w-10 h-10 rounded-lg relative z-10 transition-all duration-200 ease-in cursor-pointer text-3xl hover:bg-blue-600 hover:text-white">
              X
            </button>
          </div>

          <CourseCreationOptions visibility={page === 1} onChange={handleCourseCreationOptionChange} />
          <CourseInfoEntry visibility={page === 2} onChange={handleCourseInfoEntry} />
          <FileUpload visibility={page === 3} onChange={handleFileUpload} />
          <TopicSelection visibility={page === 4} topics={generatedTopics}
            selectedTopics={selectedTopics}
            onTopicChange={handleTopicChange}
          />

          <div className={page !== 4 ? "flex justify-between w-full rounded-t-lg px-4 pb-4 mt-auto" : "flex justify-end w-full rounded-t-lg pr-4 pb-4 mt-auto"}>
            <button
              onClick={handleBack}
              className={page !== 4 ? 'bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' : 'hidden'}>
              Back
            </button>

            <div>
              <button
                onClick={() => {
                  if (page !== 4){
                    handleNext();
                  }
                  else{
                    setCourseTopics();
                    setPage(1)
                    setSelectedTopics([]);
                    close();
                  }
                }}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};
