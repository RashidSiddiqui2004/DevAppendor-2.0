
import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import myContext from '../../context/data/myContext'
import { Link } from 'react-router-dom';
import getUserID from '../../utils/GetUserid';
import getTimeDetails from '../../utils/GetTimeData'
import { GiCrystalGrowth } from "react-icons/gi";
import { FaFolderOpen } from "react-icons/fa6";
import { PiPawPrintFill } from "react-icons/pi";
import Button from '../Buttons/Button';


const UserDashboard = () => {

    const context = useContext(myContext);
    const { myForms, getMyForms } = context;


    useEffect(() => {

        const fetchMyforms = async () => {
            const userForms = getUserID().then((userid) => getMyForms(userid))
        }

        fetchMyforms();

    }, [])

    return (
        <div className='pt-4 pb-16'>
            <Navbar />
            <h1 className='my-2 text-4xl mt-3 lg:mt-0 lg:text-2xl lora font-bold'>Developer Hub</h1>

            <div className='text-center lora my-2 mx-3 lg:mx-24 bg-slate-800
             text-white py-4 lg:py-2 px-3
            rounded-lg shadow-md shadow-emerald-200'>

                <p>Explore a comprehensive overview of your
                    creations with the Developer Hub. Gain insights into your forms, from response
                    counts to titles, and effortlessly access detailed responses by simply clicking
                    the file icon.
                </p>

                <p className='my-2'>Elevate your experience with DevAppendor's user-friendly dashboard.</p>
            </div>

            {(myForms.length === 0)
                ?
                <div className="text-center mt-8">
                    <p className="text-xl font-bold text-gray-200 mb-4">
                        You haven't created any forms yet.
                    </p>
                    <p className="text-lg text-gray-400 mb-6">
                        Dive into the world of possibilities! Create your first form and gather valuable insights effortlessly.
                    </p>
                    <div className='flex justify-center'>
                        <Button message={'Create a New Form'} />
                    </div>

                </div>
                :
                ''}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 my-4">

                {myForms.map((form, index) => {
                    const { eventName, id, time, numberofResponses } = form;

                    const [creationDate, timeStamp] = getTimeDetails(time);

                    return (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md lora">

                            <div className='flex flex-row justify-center'>
                                <h2 className="text-xl font-semibold text-white mb-2">{eventName}</h2>
                                <Link to={`https://devappendor.web.app/form-insights/${id}`} title='Get form insights'>
                                    <FaFolderOpen className='mt-1 ml-3 text-3xl cursor-pointer' />
                                </Link>
                            </div>
                            <p className='mt-2 text-slate-200 px-3 py-2
                                font-bold flex flex-row gap-2 justify-center'>
                                <GiCrystalGrowth className='mt-0 text-2xl'>
                                </GiCrystalGrowth>{numberofResponses !== null ? numberofResponses : 0} response{numberofResponses > 1 ? "s" : ''}</p>
                            <p className="text-gray-400 italic">Created : {creationDate}</p>
                            <p className="text-gray-400 italic">{timeStamp}</p>

                            <p className='mt-2 text-slate-200 px-3 py-2
                                font-bold flex flex-row gap-2 justify-center'>
                                <PiPawPrintFill className='mt-0 text-2xl'>
                                </PiPawPrintFill>{numberofResponses !== null ? numberofResponses : 0} View{numberofResponses > 1 ? "s" : ''}</p>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default UserDashboard