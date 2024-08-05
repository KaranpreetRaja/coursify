import Navbar from '../components/navbar';
import { Link, useParams } from "react-router-dom";
import { useState } from 'react';
import LessonCard from '../components/lessonCard';

export default function Course() {
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const course_id = useParams("course_id")
    // const [courseData, setCourseData] = useState({
    //     course_name: '',
    //     course_description: '',
    //     Lessons: []
    // });

    const [courseData, setCourseData] = useState({
        course_name: 'Machine Learning',
        course_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nulla non ex egestas molestie. Nunc euismod hendrerit magna, at scelerisque leo vestibulum vel. Aenean feugiat in felis ut blandit. Duis sed purus sit amet enim sollicitudin feugiat quis ut ligula. Proin elementum magna ut massa pharetra, id cursus nulla sollicitudin. Duis ultricies venenatis consectetur. Cras eget nisi id diam rhoncus sollicitudin. Ut nulla ante, bibendum quis blandit in, lobortis ut ligula. Nam sed pharetra ante, in scelerisque metus. Nam sagittis dui quis nisi ultrices convallis. Praesent interdum, velit sit amet consequat aliquam, eros mi hendrerit ante, id dignissim nunc felis non nulla. Etiam tincidunt in eros at dictum. Mauris sit amet vehicula risus. Aliquam vel nisi dui. Nullam ornare felis in lacus aliquet, nec egestas diam consequat. Curabitur ultricies nisi elit, et vestibulum tellus venenatis sed.',
        Lessons: [
            {
                lesson_id: '1',
                lesson_name: 'Introduction to Machine Learning',
                lesson_description: 'Overview of machine learning concepts and applications.',
            },
            {
                lesson_id: '2',
                lesson_name: 'Supervised Learning',
                lesson_description: 'Deep dive into supervised learning techniques and algorithms.',
            },
            {
                lesson_id: '3',
                lesson_name: 'Unsupervised Learning',
                lesson_description: 'Understanding clustering, association, and dimensionality reduction.',
            },
            {
                lesson_id: '4',
                lesson_name: 'Reinforcement Learning',
                lesson_description: 'Basics of reinforcement learning and its applications.',
            },
            {
                lesson_id: '5',
                lesson_name: 'Neural Networks and Deep Learning',
                lesson_description: 'Introduction to neural networks and deep learning architectures.',
            }
        ]
    });

    // useEffect(() => {
    //     const fetchLessons = async () => {
    //         try {
    //             const response = await axios.get("/api/course_config/get/get_course", {
    //                 uid,
    //                 session_id,
    //                 course_id
    //             });
    //            setCourseData(response.data);
                
    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     };

    //     fetchLessons();
    // }, [uid, session_id]);

    return (
        <div>
            <Navbar />
            <div className='bg-gray-200 w-full flex flex-col'>
                <div className='mb-4 bg-gradient-to-t from-blue-500 to-blue-900 w-full h-64 flex flex-col items-start py-6 px-8'>
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
                <div className='flex flex-col items-start pl-4 pr-8'>
                    {courseData.Lessons.map((lesson) => (
                        <LessonCard
                            key={lesson.lesson_id}
                            lesson_id={lesson.lesson_id}
                            lesson_name={lesson.lesson_name}
                            lesson_description={lesson.lesson_description}
                            course_id={course_id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}