import React from 'react';
import { FaBook } from "react-icons/fa";

const Card = ({ courseName }) => {
    return (
        <div className="mr-4 mb-4 w-60 h-72 bg-white rounded-lg border border-slate-800 transition-transform hover:scale-105 duration-500 ease-in-out">
            <div className='w-full h-5/6 flex justify-center items-center'>
                <FaBook size={60} color='gray'/>
            </div>
            <div className='h-1/6 bg-slate-100 rounded-b-lg flex justify-center items-center'>
                <span>{courseName}</span>
            </div>
        </div>
    );
};

export default Card;