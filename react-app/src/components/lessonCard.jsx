import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LessonCard({lesson_id, lesson_name, lesson_description, lesson_loaded, course_id }) {
    const navigate = useNavigate();
    const uid = window.localStorage.getItem('uid');

    const handleSelectedLesson = () => {
        navigate(`/course/${uid}/${course_id}/lesson/${lesson_id}`)
    }

    return (
        <div onClick={handleSelectedLesson} className='bg-white shadow-md rounded-lg p-6 mb-4 w-full hover:bg-zinc-100 cursor-pointer'>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-bold mb-2'>{lesson_name}</h2>
                <p className='text-gray-700 mb-4'>{lesson_description}</p>
                <div className='flex items-center'>
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${lesson_loaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span>{lesson_loaded ? 'Ready to use' : 'Generating'}</span>
                </div>
            </div>
        </div>
    );
}
