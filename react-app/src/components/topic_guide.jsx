import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function TopicGuide({ topicName, index }) {
    return (
        <>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle 
                id="dropdown-autoclose-false" 
                className={`w-full h-12 items-center bg-gray-100 border border-gray-600 flex flex-row justify-start ${index === 1 ? 'rounded-t-md' : ''}`}>
                    <span className='ml-36 text-gray-800'>{`TOPIC ${index}`}</span>
                    <span className='text-lg font-semibold ml-20'>{topicName}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='flex flex-col'>
                    <Dropdown.Item className='w-full h-9 bg-gray-100 border border-gray-600'>
                        Menu Item
                    </Dropdown.Item>
                    <Dropdown.Item className='w-full h-9'>Menu Item</Dropdown.Item>
                    <Dropdown.Item className='w-full h-9'>Menu Item</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};
