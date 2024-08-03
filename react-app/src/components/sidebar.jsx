import { useState } from "react";
import { Link } from "react-router-dom";
import { LuClock4 } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Sidebar() {

    return (
        <div className='w-2/8 h-full bg-gray-100'>
            <div className="flex flex-col w-full text-left ml-11 text-lg space-y-4 mt-11">
                <div className="flex flex-row items-center text-blue-500 space-x-2">
                    <LuClock4 />
                    <span>Recent Courses</span>
                </div>
                <div className="flex flex-row items-center text-black space-x-2">
                    <MdOutlineLibraryBooks />
                    <span>Courses</span>
                </div>
                <div className="flex flex-row items-center text-black space-x-2">
                    <FaPeopleGroup />
                    <span>Browse</span>
                </div>
            </div>
        </div>
    )
}