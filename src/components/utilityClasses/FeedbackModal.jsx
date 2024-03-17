
import React, { useState } from 'react';
import Feedback from './Feedback';

const SurveyModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        // <div>
        //     <button onClick={openModal}>Fill Quick Survey</button>
        //     <Modal
        //         isOpen={isOpen}
        //         onRequestClose={closeModal}
        //         contentLabel="Quick Survey"
        //     >
        //         <button onClick={closeModal}>Close</button>
        //         <Feedback />  
        //     </Modal>
        // </div>

        <div className='mt-10'>

            <button onClick={openModal}>Fill Quick Survey</button>

            {/* <span className='cursor-pointer text-blue-500' onClick={openModal}>
                <FaCircleInfo className='text-white text-xl' />
            </span> */}

            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center py-20 px-[5%] md:px-0'>
                <div className='bg-white p-4 rounded-md text-slate-800'>


                    <button onClick={openModal}>Fill Quick Survey</button>

                    {/* <Feedback/> */}

                </div>
            </div>

        </div>
    );
};

export default SurveyModal;
