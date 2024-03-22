
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import '../styles.css'
import { GiCrystalGrowth } from "react-icons/gi";
import Navbar from '../Navbar';
// import { TbBeta } from "react-icons/tb";

const FormResponses = () => {

    const context = useContext(myContext)

    const { collectData } = context;

    const [title, setFormTitle] = useState('');
    const [formStructure, setFormStructure] = useState(null);

    const [isBetaVersion, setIsBeta] = useState(false);
    const [formResponses, setformResponses] = useState(null);

    const params = useParams();
    const formID = params.id;

    const [numResp, setNumResp] = useState(null);

    const [expandedIndex, setExpandedIndex] = useState(0);

    const [isListview, setListView] = useState(true);

    function getTimeAgo(timestamp) {
        const now = new Date(); // Current date and time
        const then = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

        // Calculate the time difference in milliseconds
        const difference = now.getTime() - then.getTime();

        // Convert the difference to seconds, minutes, hours, or days as needed
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // Determine the appropriate time unit and return the time ago string
        if (days > 0) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
    }



    useEffect(() => {

        const getFormResponses = async () => {

            await collectData(formID).then((data) => {
                const { form, responses } = data;

                if (responses.length > 1) {
                    setIsBeta(true);
                }

                setFormTitle(form.eventName)
                setFormStructure(form.fields);
                setNumResp(form.numberofResponses);
                setformResponses(responses);
            }).catch((error) => {
                console.log(error);
            })
        }

        getFormResponses();
    }, [])

    return (
        <div className='lora pb-16 overflow-hidden'>
            <Navbar />

            {/* {
                isBetaVersion ?
                    <div className='flex justify-end mr-8 my-3 text-xl border-2
                     border-gray-700 rounded-full bg-slate-900 px-2 py-2 w-fit absolute right-10
                     '>
                        <TbBeta title='Beta version' />
                    </div>
                    :
                    <></>
            } */}

            <div className='flex flex-row justify-around gap-x-4 mx-2'>

                <button className='bg-slate-900 text-slate-200 rounded-sm px-3 justify-start my-2'
                    onClick={() => setListView(prev => !prev)}> {isListview ? 'Table' : 'List'} View</button>


                <span className='mt-2 text-slate-200 px-3 py-2
                 font-bold bg-slate-800 flex flex-row gap-2'>
                    <GiCrystalGrowth className='mt-0 text-2xl'>
                    </GiCrystalGrowth>{numResp !== null ? numResp : 0} response{numResp > 1 ? "s" : ""}</span>
            </div>

            <h2 className='text-xl sm:text-2xl font-bold mt-3'>{title}</h2>

            {
                isListview &&
                <div className='grid grid-cols-1 gap-4 my-4 mx-4'>
                    {formStructure && (isBetaVersion === true) && Object?.values(formResponses)?.map((response, index) => {

                        const formattedDateTime = getTimeAgo(response?.timestamp);

                        return (
                            <div
                                className={`bg-slate-900 text-white rounded-md p-2 sm:p-4 text-sm cursor-pointer`}
                                key={index}
                                onClick={() => setExpandedIndex(index === expandedIndex ? index : index)}
                            >
                                <div className='grid grid-cols-12 py-2 sm:py-3'>
                                    <p className='hidden sm:block col-span-4'></p>
                                    <h2 className='col-span-4 overflow-hidden overflow-ellipsis'>{`Response ${index + 1}`}</h2>
                                    <p className='block sm:hidden col-span-4'></p>
                                    <p className='col-span-4 text-slate-300'>{formattedDateTime}</p>
                                </div>

                                <div className={`${expandedIndex === index ? 'block border-t-2 border-opacity-95 border-gray-500 pt-2' : 'hidden'}`}>
                                    {Object?.values(response.formData)?.map((value, pos) => (
                                        <div className='grid grid-cols-12 gap-6 mx-[5vw] md:mx-[20vw] py-1' key={pos}>
                                            <label className='col-span-3 text-gray-200'>{formStructure[pos].realName}</label>
                                            <span className='col-span-9 overflow-hidden overflow-ellipsis'>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        )
                    }
                    )}
                </div>

            }


            {
                !isListview
                &&
                <div className='mt-5 md:justify-center'>

                    <div className='flex flex-row gap-x-6 p-4 text-nowrap overflow-y-auto overflow-x-scroll bg-slate-800 mt-2 justify-center md:gap-20 rounded-md shadow-lg shadow-emerald-200 md:mx-4'>

                        {formStructure && (isBetaVersion === true) &&

                            Object.keys(formStructure).map((fieldName) => {

                                const newResponses = formResponses.map(obj => obj.formData[fieldName]);

                                const field = formStructure[fieldName];

                                if (field) {
                                    return (
                                        <div key={fieldName} className=''>
                                            <h3 className='text-lg underline underline-offset-2 mb-2 font-bold'>{field.realName}</h3>

                                            {newResponses.map((response, index) => (
                                                <p key={index} className='mb-3 flex justify-center text-xs ml-3'>{response}</p>
                                            ))}

                                        </div>
                                    );
                                } else {
                                    return null;
                                }

                            })}

                        {formStructure && (isBetaVersion === false) &&
                            Object.keys(formStructure).map((fieldName) => {

                                const field = formStructure[fieldName];

                                if (field) {
                                    return (
                                        <div key={fieldName} className=''>
                                            <h3 className='text-lg underline underline-offset-2 mb-2 font-bold'>{field.realName}</h3>

                                            {field.responses.map((item, index) => (
                                                <p key={index} className='mb-3 flex justify-center ml-3'>{item}</p>
                                            ))}

                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                    </div>
                </div>
            }




            <div className='bg-slate-600 w-fit px-3 py-2 mt-16 pb-2
                mx-[22%] md:ml-[39%] shadow-md shadow-purple-500'>
                <h2 className='flex justify-center'>Developed with ❤️ by Rashid Siddiqui</h2>
            </div>


        </div>
    )
}

export default FormResponses


