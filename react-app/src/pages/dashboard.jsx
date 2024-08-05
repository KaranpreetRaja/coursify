import Navbar from '../components/navbar';
import CourseCard from '../components/courseCard';
import Sidebar from '../components/sidebar';
import { FaPlus } from "react-icons/fa";
import Wizard from '../components/wizard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [trendingCourses, setTrendingCourses] = useState([]);
    const navigate = useNavigate();
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');

    const handleCourseCreation = (course_id, course_name, course_description) => {
        const newCourse = {course_id, course_name, course_description}
        console.log(newCourse)
        setCourses((prevCourses) => [...prevCourses, newCourse])
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/api/course_config/get/get_all_courses_user", { 
                    uid,
                    session_id                  
                });

                if (response.data && response.data.courses) {
                    setCourses(response.data.courses);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCourses();
    }, [uid, session_id]);

    useEffect(() => {
        const fetchTrendingCourses = async () => {
            try {
                const response = await axios.get("/api/course_config/get/get_all_courses_trending", { 
                    uid,
                    session_id                  
                });

                if (response.data && response.data.courses) {
                    setTrendingCourses(response.data.courses);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchTrendingCourses();
    }, [uid, session_id]);

    // useEffect(() => {
    //     const session_id = window.localStorage.getItem('session_id');
    //     if (session_id == null){
    //         navigate(`/login`);
    //     }
    // },[])

    return (
        <div>
            <Navbar />
            <div className='bg-gray-50 w-screen h-full flex flex-col'>
                {/* <Sidebar/> */}

                <div className="flex flex-col w-full py-8 px-8 h-full">
                    <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
                    <div className="flex flex-wrap w-full">
                        <div className='mr-4'>
                            <Wizard handleCourseCreation={handleCourseCreation} />
                        </div>
                        {courses.map(course => (
                            <CourseCard
                                course_id={course.course_id}
                                courseName={course.course_name}
                                uid={uid}
                                // courseDescription={course.course_description}
                            />
                        ))}
                        <CourseCard courseName="EECS 3311" />
                        <CourseCard courseName="Dinosaurs" />
                        <CourseCard courseName="EECS 3311" />
                        <CourseCard courseName="Dinosaurs" />
                        <CourseCard courseName="EECS 3311" />
                        <CourseCard courseName="Dinosaurs" />
                    </div>
                </div>

                <div className="flex flex-col w-full py-8 px-8 h-full">
                    <h2 className="text-2xl font-semibold mb-4">Trending Courses</h2>
                    <div className="flex flex-wrap w-full">
                        {trendingCourses.map(course => (
                            <CourseCard
                                course_id={course.course_id}
                                courseName={course.course_name}
                                // courseDescription={course.course_description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}