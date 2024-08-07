import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LessonNavbar({ course_id, current_lesson_id }) {
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

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
                const data = JSON.parse(response.data)
                setLessons(data.lessons);
            } catch (error) {
                console.error('Failed to fetch lessons:', error.message);
            }
        };

        fetchLessons();
    }, [uid, session_id, course_id]);

    return (
        <div className='bg-gray-200 w-96 p-4'>
            <h2 className='text-xl font-semibold mb-6'>Lessons</h2>
            <ul>
                {lessons && lessons.map(lesson => (
                    <li key={lesson.lesson_id} className={`mb-6 px-2 ${lesson.lesson_id === current_lesson_id ? 'bg-blue-700 py-2  rounded-lg' : ''}`}>
                        <button
                            onClick={() => navigate(`/course/${uid}/${course_id}/lesson/${lesson.lesson_id}`)}
                            className={`text-blue-500 font-semibold  ${lesson.lesson_id === current_lesson_id ? 'text-white' : 'hover:text-blue-700'}`}
                            disabled={lesson.lesson_id === current_lesson_id}
                        >
                            {lesson.lesson_name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}