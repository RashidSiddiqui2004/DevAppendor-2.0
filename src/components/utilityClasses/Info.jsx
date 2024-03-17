
import React, { useState } from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";


const Info = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className='mt-10'>
            <span className='cursor-pointer text-blue-500' onClick={openModal}>
                <FaCircleInfo className='text-white text-xl'/>
            </span>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center py-20 px-[5%] md:px-0'>
                    <div className='bg-white p-4 rounded-md text-slate-800'>
                    
                        <button onClick={closeModal} className='text-blue-500 mt-2 underline float-right'>
                            <IoCloseOutline className='text-slate-900 text-xl'/>
                        </button>
                        <p className='font-semibold mt-2'>* represents necessary field.</p>

                        <p> DevAppendor –  Your go-to platform for hassle-free form management</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Info