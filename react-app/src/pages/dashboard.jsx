import Navbar from '../components/navbar';
import Card from '../components/card';
import Sidebar from '../components/sidebar';
import { FaPlus } from "react-icons/fa";
import Wizard from '../components/wizard';

export default function Dashboard(){
    return(
        <div>
            <Navbar/>
            <div className='bg-gray-50 w-screen h-full flex flex-row'>
                <Sidebar/>

                <div className="flex flex-col w-6/8 p-16 h-full">
                    <h2 className="text-2xl font-semibold mb-4">Recent Courses</h2>
                    <div className="flex flex-wrap w-full">
                        <div className='mr-4'>
                            <Wizard/>
                        </div>
                        <Card courseName="EECS 3311"/>
                        <Card courseName="Dinosaurs"/>
                        <Card courseName="EECS 3311"/>
                        <Card courseName="Dinosaurs"/>
                        <Card courseName="EECS 3311"/>
                        <Card courseName="Dinosaurs"/>
                    </div>
                </div>              
            </div>
        </div>
    )
}