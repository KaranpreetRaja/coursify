import Navbar from '../components/navbar';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import TopicGuide from '../components/topic_guide';

export default function Course(){
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    return(
        <div>
            <Navbar/>
            <div className='bg-gray-200 w-screen h-screen flex flex-col'>
                <div className='bg-gradient-to-t from-blue-500 to-blue-900 w-full h-64 flex flex-col items-start py-6 px-96'>
                    <div className='mb-3 flex flex-row space-x-2'>
                        <Link to="/dashboard" className="text-amber-50">Dashboard</Link>
                        <span className="text-amber-50 cursor-pointer">{`>`}</span>
                        <span className="text-amber-50 cursor-pointer">Course Name</span>
                    </div>
                    <div className='space-y-4 text-gray-100 font-medium text-md'>
                        <div className='flex flex-row space-x-3 items-center'>
                            <div className='h-11 w-4 bg-green-500'></div>
                            <h1 className='text-white font-bold text-3xl '>Course Name</h1>
                        </div>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus justo ut mollis elementum. Etiam nec lorem quis justo feugiat mollis et vitae leo. Phasellus mauris lectus, egestas nec tellus in, aliquam ultrices erat. Vivamus eleifend elit vitae arcu faucibus eleifend. Ut eleifend neque nulla, eget congue risus eleifend sit amet. Donec rutrum aliquam arcu pharetra ornare. Donec nisl urna, accumsan at leo quis, rutrum lacinia ex. Nullam eget rhoncus sapien. Etiam porta mi sit amet turpis vestibulum sodales. In eu malesuada ante. Vestibulum vehicula porttitor libero, porttitor mattis sapien viverra in.
                        </p>
                    </div>
                </div>
                <div className='p-9 flex flex-col items-start ml-96'>
                    <h2 className='text-2xl font-semibold'>Course guide</h2>
                    <div className='flex flex-col mt-4 w-topic'>
                        <TopicGuide topicName="How to be big" index={1}/>
                        <TopicGuide topicName="How to be big" index={2}/>
                        <TopicGuide topicName="How to be big" index={3}/>
                    </div>
                </div>
            </div>
        </div>
    )
}