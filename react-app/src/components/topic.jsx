import React from 'react';
import { MdTopic } from "react-icons/md";

export default function Topic({ topicName, index }) {
    return (
        <div className="w-60 h-40 bg-white rounded-lg border border-slate-800 mx-2">
            <div className='h-1/6 bg-slate-300 font-semibold rounded-t-lg flex justify-center items-center'>
                <span className='text-lg'>Topic {index}</span>
            </div>
            <div className='w-full h-3/6 flex justify-center items-center text-blue-300'>
                <MdTopic size={60}/>
            </div>
            <div className='h-2/6 bg-slate-300 text-xl rounded-b-lg flex justify-center items-center'>
                <span>{topicName}</span>
            </div>
        </div>
    );
};
