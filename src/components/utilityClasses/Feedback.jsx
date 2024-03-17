import React, { useState } from 'react';
import { surveyQuestions } from './SurveyQuestions';

const Feedback = () => {
    const [questionId, setQuestionId] = useState(0);

    const submitAnswer = async (e) => {
        const value = e.target.value;
        console.log(value);
        setQuestionId((prev) => prev + 1);
    };

    return (
        <section id="feedback" className='justify-center text-left mx-[30vw]'>
            {surveyQuestions.slice(questionId, questionId + 1).map((question, index) => {
                return (
                    <div key={index}>
                        <p className=' px-2 py-2 font-semibold text-center'>{question.question}</p>
                        {question.isDescriptive && (
                            <div className='flex flex-col'>
                                <textarea
                                    placeholder="Enter your response here..."
                                    rows={4}
                                    cols={40}
                                    className='rounded-xl bg-slate-800
                                     text-slate-100 px-2 py-2 outline-none border-none'
                                />

                                <button onClick={submitAnswer}
                                    className='bg-slate-800 w-fit px-3 py-2 rounded-md
                                 items-center mx-auto mt-3'
                                >Submit</button>
                            </div>

                        )}
                        {!question.isDescriptive && !question.isNumeric && (
                            <select className='bg-slate-800 text-white items-center mx-[13vw] 
                            px-2 py-2 rounded-lg'
                                onChange={submitAnswer}>
                                <option value="" disabled className='outline-none border-none px-2 py-1'>Select an option</option>
                                {question.options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option} className='outline-none border-none'>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                        {!question.isDescriptive && question.isNumeric && (
                            <div className='flex flex-col'>
                            <input
                                type="number"
                                placeholder='Enter your response' 
                                max={10}
                                min={1}
                                className='rounded-xl bg-slate-800 items-center mx-auto flex justify-center
                                text-slate-100 px-10 py-2 outline-none border-none text-center'
                            />
                            <button onClick={submitAnswer}
                                    className='bg-slate-800 w-fit px-3 py-2 rounded-md
                                 items-center mx-auto mt-3'
                                >Submit</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default Feedback;
