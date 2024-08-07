import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../components/sidebar';
import LessonNavbar from '../components/lessonNavbar';
import { Link } from "react-router-dom";
import Quiz from '../components/quiz';
import Chatbot from '../components/chatbot';

export default function Lesson() {
    const { lesson_id, course_id } = useParams();
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const [lessonData, setLessonData] = useState({
        lesson_name: '',
        lesson_description: '',
        lesson_loaded: false,
        material: null
    });
    // const [lessonData, setLessonData] = useState({
    //     lesson_name: 'Introduction to Machine Learning',
    //     lesson_description: 'This lesson covers the basics of machine learning including supervised and unsupervised learning.',
    //     lesson_loaded: true,
    //     material: 'E = mc^2'
    // });

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/course_config/get/get_lesson", {
                    params: {
                        uid,
                        session_id,
                        course_id,
                        lesson_id
                    }
                });

                if (response.data) {
                    setLessonData(JSON.parse(response.data));
                }

                // if (!response.data.lesson_loaded) {
                //     setTimeout(fetchLesson, 3000);
                // }

            } catch (error) {
                console.error('Failed to fetch lesson:', error);
            }
        };

        fetchLesson();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex flex-row min-h-screen'>
                <LessonNavbar course_id={course_id} current_lesson_id={lesson_id} />

                <div className='bg-gray-100 w-full flex flex-col'>
                    <div className='bg-gray-100 w-full flex flex-col items-start py-4 px-8 mb-8'>
                        <div className='space-y-4 text-gray-100 font-medium text-md'>
                            <div className='px-4 mb-4'>
                                <nav className='text-gray-500 text-sm'>
                                    <Link to={`/course/${uid}/${course_id}`} className='hover:underline'>Course</Link>
                                    <span className='mx-2'>{'>'}</span>
                                    <span className='text-gray-900'>Lesson</span>
                                </nav>
                            </div>
                            <div className='flex flex-row space-x-3 items-center'>
                                <div className='h-11 w-4 bg-blue-500'></div>
                                <h1 className='text-black font-bold text-3xl '>{lessonData.lesson_name}</h1>
                            </div>
                            <p className='text-black'>
                                {lessonData.lesson_description}
                            </p>
                        </div>
                    </div>
                    {lessonData.lesson_loaded && lessonData.material ? (
                        <div className='px-4 flex flex-col items-start'>
                            <div className='bg-white shadow-md rounded-lg p-6 mb-4 w-full flex flex-col'>
                                <h2 className='text-2xl font-semibold mb-4'>Lesson Material</h2>
                                <p>{lessonData.material}</p>
                            </div>
                        </div>
                    ) : (
                        <div className='px-4 flex flex-col items-center'>                       
                            <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full flex flex-col gap-4">
                                <div className="animate-pulse bg-gray-300 w-2/4 h-5 rounded-full"></div>
                                <div className="animate-pulse bg-gray-300 w-3/4 h-5 rounded-full"></div>
                                <div className="animate-pulse bg-gray-300 w-full h-5 rounded-full"></div>
                                <div className="animate-pulse bg-gray-300 w-full h-5 rounded-full"></div>
                                <div className="animate-pulse bg-gray-300 w-3/4 h-5 rounded-full"></div>
                                <div className="animate-pulse bg-gray-300 w-full h-5 rounded-full"></div>
                                <div className="animate-pulse bg-gray-300 w-full h-5 rounded-full"></div>
                            </div>
                        </div>
                    )
                    }

                    <div className="flex justify-between w-3/4 rounded-t-lg px-4 pb-4 mt-auto text-2xl">
                        <Link
                            to={lesson_id <= 1
                                ? ''
                                : `/course/${uid}/${course_id}/lesson/${Number(lesson_id) - 1}`}
                            className='flex justify-center items-center bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>
                            Back
                        </Link>
                        <Quiz course_id={course_id} lesson_id={lesson_id} />        
                        <Link
                            to={`/course/${uid}/${course_id}/lesson/${Number(lesson_id) + 1}`}
                            className="flex justify-center items-center bg-blue-800 text-white px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                            Next
                        </Link>

                        <Chatbot context={lessonData.material}/>
                    </div>

                </div>
            </div>
        </div>
    );
}
