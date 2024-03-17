import React, { useState } from 'react';
import Feedback from './Feedback';

const SurveyModal = ({ setSurveyDone }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setSurveyDone(false);
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
            <div className='w-96 p-4 rounded-md bg-slate-800'>
                {!isOpen ? (
                    <div>
                        <h2 className='text-center text-xl font-semibold text-gray-200'>
                            Quick Survey
                        </h2>
                        <p className='text-center text-gray-200 mt-2'>
                            Help us improve! Fill out a quick survey.
                        </p>
                        <button
                            onClick={openModal}
                            className='block w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            Start Survey
                        </button>
                    </div>
                ) : (
                    <div className=''>
                        <Feedback onClose={closeModal} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyModal;
