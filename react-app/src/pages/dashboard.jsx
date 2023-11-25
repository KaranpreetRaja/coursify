import Navbar from '../components/navbar';
import Card from '../components/card';
import Sidebar from '../components/sidebar';
import { FaPlus } from "react-icons/fa";

export default function Dashboard(){
    return(
        <div>
            <Navbar/>
            <div className='bg-gray-50 w-screen h-screen flex flex-row'>
                <Sidebar/>

                <div className="flex flex-col w-full p-16 ">
                    <h2 className="text-2xl font-semibold">Recent Courses</h2>
                    <div className="flex w-full px-2 py-11 space-x-9">
                        <button className="p-6 flex flex-col justify-end items-center w-60 h-72 bg-blue-400 rounded-lg transition-transform hover:scale-105 duration-500 ease-in-out">
                            <FaPlus size={30} className='mb-20'/>
                            <span className='text-white text-lg font-semibold'>New Course</span>
                        </button>
                        <Card courseName="EECS 3311"/>
                        <Card courseName="Dinosaurs"/>
                        <Card courseName="How to be big"/>
                        <Card courseName="RIZZ 101"/>
                    </div>
                </div>              
            </div>
        </div>
    )
}