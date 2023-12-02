import Navbar from '../components/navbar';
import Card from '../components/card';
import Sidebar from '../components/sidebar';
import { FaPlus } from "react-icons/fa";
import Wizard from '../components/wizard';

export default function Dashboard(){
    return(
        <div>
            <Navbar/>
            <div className='bg-gray-50 w-screen h-screen flex flex-row'>
                <Sidebar/>

                <div className="flex flex-col w-full p-16 ">
                    <h2 className="text-2xl font-semibold">Recent Courses</h2>
                    <div className="flex w-full px-2 py-11 space-x-9">
                        <Wizard/>
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