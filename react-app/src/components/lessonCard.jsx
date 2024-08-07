import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LessonCard({ lesson_id, lesson_name, lesson_description,  }) {
    const navigate = useNavigate();
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const [lessonLoaded, setLessonLoaded] = useState(false);
    const course_id = "010"

    const checkLessonLoaded = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/course_config/get/get_lesson_loaded', {
                params: {
                    uid,
                    session_id,
                    course_id,
                    lesson_id
                }
            });

            if (response.data) {
                setLessonLoaded(true);
            } else {
                setTimeout(checkLessonLoaded, 3000);
            }
        } catch (error) {
            console.error('Failed to check if lesson is loaded:', error.message);
        }
    };

    useEffect(() => {
        checkLessonLoaded();
    }, []);

    const handleSelectedLesson = () => {
        navigate(`/course/${uid}/${course_id}/lesson/${lesson_id}`);
    };

    return (
        <div onClick={handleSelectedLesson} className='bg-white shadow-md rounded-lg p-6 mb-4 w-full hover:bg-zinc-100 cursor-pointer'>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-bold mb-2'>{lesson_name}</h2>
                <p className='text-gray-700 mb-4'>{lesson_description}</p>
                <div className='flex items-center'>
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${lessonLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span>{lessonLoaded ? 'Ready to use' : 'Generating'}</span>
                </div>
            </div>
        </div>
    );
}
