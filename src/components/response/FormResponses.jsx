
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import '../styles.css'
import { GiCrystalGrowth } from "react-icons/gi";
import Navbar from '../Navbar';
import { TbBeta } from "react-icons/tb";

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
        <div className='lora pb-16'>
            <Navbar />

            {
                isBetaVersion ?
                    <div className='flex justify-end mr-8 my-3 text-xl border-2
                     border-gray-700 rounded-full bg-slate-900 px-2 py-2 w-fit absolute right-10
                     '>
                        <TbBeta title='Beta version'/>
                    </div>
                    :
                    <></>
            }

            <div className='flex flex-row justify-center gap-x-4'>
                <h2 className='text-2xl font-bold mt-3'>{title}</h2>

                <span className='mt-2 text-slate-200 px-3 py-2
                 font-bold bg-slate-800 flex flex-row gap-2'>
                    <GiCrystalGrowth className='mt-0 text-2xl'>
                    </GiCrystalGrowth>{numResp !== null ? numResp : 0} response{numResp > 1 ? "s" : ''}</span>
            </div>

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
                                            <p key={index} className='mb-3 flex justify-center ml-3'>{response}</p>
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

            <div className='bg-slate-600 w-fit px-3 py-2 mt-8 pb-2
     mx-[22%] md:ml-[39%] shadow-md shadow-purple-500 '>
                <h2 className='flex justify-center'>Developed with ❤️ by Rashid Siddiqui</h2>
            </div>


        </div>
    )
}

export default FormResponses


