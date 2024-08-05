import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../components/sidebar';
import LessonNavbar from '../components/lessonNavbar';
import { Link } from "react-router-dom";
import Quiz from '../components/quiz';

export default function Lesson() {
    const { lesson_id, course_id } = useParams();
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    // const [lessonData, setLessonData] = useState({
    //     lesson_name: '',
    //     lesson_description: '',
    //     lesson_loaded: false,
    //     material: null
    // });
    const [lessonData, setLessonData] = useState({
        lesson_name: 'Introduction to Machine Learning',
        lesson_description: 'This lesson covers the basics of machine learning including supervised and unsupervised learning.',
        lesson_loaded: true,
        material: 'E = mc^2'
    });

    // useEffect(() => {
    //     const fetchLesson = async () => {
    //         try {
    //             const response = await axios.get("/api/course_config/get/get_lesson", {
    //                 params: {
    //                     uid,
    //                     session_id,
    //                     lesson_id
    //                 }
    //             });

    //             if (response.data) {
    //                 setLessonData(response.data);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch lesson:', error.message);
    //         }
    //     };

    //     fetchLesson();
    // }, [uid, session_id, lesson_id]);

    return (
        <div>
            <Navbar />
            <div className='flex flex-row min-h-screen'>
                <LessonNavbar course_id={course_id} current_lesson_id={lesson_id} />

                <div className='bg-gray-100 w-full flex flex-col'>
                    <div className='bg-gray-100 w-full flex flex-col items-start py-4 px-8 mb-8'>
                        <div className='space-y-4 text-gray-100 font-medium text-md'>
                            <div className='flex flex-row space-x-3 items-center'>
                                <div className='h-11 w-4 bg-blue-500'></div>
                                <h1 className='text-black font-bold text-3xl '>{lessonData.lesson_name}</h1>
                            </div>
                            <p className='text-black'>
                                {lessonData.lesson_description}
                            </p>
                        </div>
                    </div>
                    {lessonData.lesson_loaded && lessonData.material && (
                        <div className='px-4 flex flex-col items-start'>
                            <div className='bg-white shadow-md rounded-lg p-6 mb-4 w-full'>
                                <h2 className='text-2xl font-semibold mb-4'>Lesson Material</h2>
                                <p>{lessonData.material}</p>
                            </div>
                        </div>
                    )}


                    <div className="flex justify-between w-full rounded-t-lg px-4 pb-4 mt-auto text-2xl">
                        <Link
                            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>
                            Back
                        </Link>
                        <Quiz/>
                        <Link
                            className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                            Next
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
