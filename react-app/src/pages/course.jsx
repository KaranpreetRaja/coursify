import Navbar from '../components/navbar';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import LessonCard from '../components/lessonCard';
import axios from 'axios';

export default function Course() {
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const { course_id } = useParams()

    const [courseData, setCourseData] = useState({
        course_name: '',
        course_description: '',
        lessons: []
    });

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/course_config/get/get_course", {
                    params: {
                        uid,
                        session_id,
                        course_id
                    }
                });
                setCourseData(JSON.parse(response.data));
            } catch (error) {
                console.error(error);
            }
        };

        fetchLessons();
    }, [uid, session_id]);

    return (
        <div>
            <Navbar />
            <div className='bg-gray-200 w-full flex flex-col'>
                <div className='mb-4 bg-gradient-to-t from-blue-500 to-blue-900 w-full  flex flex-col items-start py-6 px-8'>
                    <div className='space-y-4 text-gray-100 font-medium text-md'>
                        <div className='flex flex-row space-x-3 items-center'>
                            <div className='h-11 w-4 bg-green-500'></div>
                            <h1 className='text-white font-bold text-3xl '>{courseData.course_name}</h1>
                        </div>
                        <p>
                            {courseData.course_description}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-start pl-4 pr-8 min-h-screen'>
                    {courseData.lessons && courseData.lessons.map((lesson) => (
                        <LessonCard
                            key={lesson.lesson_id}
                            lesson_id={lesson.lesson_id}
                            lesson_name={lesson.lesson_name}
                            lesson_description={lesson.lesson_explanation}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}