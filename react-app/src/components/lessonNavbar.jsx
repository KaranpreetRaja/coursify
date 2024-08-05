import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function LessonNavbar({ course_id, current_lesson_id }) {
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const [lessons, setLessons] = useState([
        {
            lesson_id: '1',
            lesson_name: 'Introduction to Machine Learning',
            lesson_description: 'Overview of machine learning concepts and applications.',
            lesson_loaded: true
        },
        {
            lesson_id: '2',
            lesson_name: 'Supervised Learning',
            lesson_description: 'Deep dive into supervised learning techniques and algorithms.',
            lesson_loaded: true
        },
        {
            lesson_id: '3',
            lesson_name: 'Unsupervised Learning',
            lesson_description: 'Understanding clustering, association, and dimensionality reduction.',
            lesson_loaded: false
        },
        {
            lesson_id: '4',
            lesson_name: 'Reinforcement Learning',
            lesson_description: 'Basics of reinforcement learning and its applications.',
            lesson_loaded: true
        },
        {
            lesson_id: '5',
            lesson_name: 'Neural Networks and Deep Learning',
            lesson_description: 'Introduction to neural networks and deep learning architectures.',
            lesson_loaded: false
        }
    ]);

    // useEffect(() => {
    //     const fetchLessons = async () => {
    //         try {
    //             const response = await axios.get("/api/course_config/get/get_course", {
    //                 params: {
    //                     uid,
    //                     session_id,
    //                     course_id
    //                 }
    //             });
    //             setLessons(response.data.Lessons);
    //         } catch (error) {
    //             console.error('Failed to fetch lessons:', error.message);
    //         }
    //     };

    //     fetchLessons();
    // }, [uid, session_id, course_id]);

    return (
        <div className='bg-gray-200 w-96 p-4'>
            <h2 className='text-xl font-semibold mb-6'>Lessons</h2>
            <ul>
                {lessons && lessons.map(lesson => (
                    <li key={lesson.lesson_id} className={`mb-6 px-2 ${lesson.lesson_id === current_lesson_id ? 'bg-blue-700 py-2  rounded-lg' : ''}`}>
                        <Link 
                            to={lesson.lesson_id === current_lesson_id 
                                ? '' 
                                : `/course/${uid}/${course_id}/lesson/${lesson.lesson_id}`} 
                            className={`text-blue-500 font-semibold  ${lesson.lesson_id === current_lesson_id ? 'text-white' : 'hover:text-blue-700'}`}
                        >
                            {lesson.lesson_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
