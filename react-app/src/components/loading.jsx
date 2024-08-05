import React from 'react';

const LoadingScreen = ({isLoading}) => {
    return (
        <div className={isLoading ? '' : 'hidden'} >
        <div className="rounded-t-lg rounded-b-lg absolute flex items-center w-full justify-center h-full bg-gray-100 bg-opacity-70">
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader-text">Loading...</div>
            </div>

        </div>
        </div>
    );
};

export default LoadingScreen;
