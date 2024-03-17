import React, { useState } from 'react';
import { surveyQuestions } from './SurveyQuestions';

const Feedback = ({ onClose }) => {

    const [questionId, setQuestionId] = useState(0);
    const [answers, setAnswers] = useState({});

    const submitAnswer = async (e) => {
        e.preventDefault();

        // Extract the answer value based on the question type
        let value = '';
        const question = surveyQuestions[questionId];
        if (question.isDescriptive) {
            value = e.target.querySelector('textarea').value;
        } else if (!question.isDescriptive && !question.isNumeric) {
            value = e.target.querySelector('select').value;
        } else if (!question.isDescriptive && question.isNumeric) {
            value = e.target.querySelector('input[type="number"]').value;
        }

        // Update the answers object with the new answer
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));

        // Move to the next question
        setQuestionId((prev) => prev + 1);
    };

    const handleSubmit = () => {
        // Call your backend API here to submit the answers object
        console.log('Submitting answers:', answers);
        // You can reset the form or close the modal after submitting
        onClose();
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Quick Survey</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {surveyQuestions.slice(questionId, questionId + 1).map((question, index) => {
                    return (
                        <div key={index} className="mb-4">
                            <p className="font-semibold text-gray-100 mb-2">{question.question}</p>


                            {question.isDescriptive && (

                                <div>
                                    <textarea
                                        name={`question_${questionId}`}
                                        placeholder="Enter your response here..."
                                        rows={4}
                                        className="w-full bg-gray-100 border border-gray-300 text-gray-900 font-semibold rounded-lg px-4 py-2 outline-none"
                                    />

                                    <button onClick={submitAnswer}
                                        className='bg-slate-200 text-slate-800 w-fit px-3 py-2 rounded-md
                                 items-center mx-auto mt-3'
                                    >Submit</button>
                                </div>

                            )

                            }
                            {!question.isDescriptive && !question.isNumeric && (
                                <select
                                    className="w-full bg-gray-100 border border-gray-300 
                                    rounded-lg px-4 py-2 outline-none text-slate-900"
                                    name={`question_${questionId}`}
                                    onChange={submitAnswer}
                                >
                                    <option value="" disabled>Select an option</option>
                                    {question.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option}>{option}</option>
                                    ))}
                                </select>
                            )}
                            {!question.isDescriptive && question.isNumeric && (

                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter your response"
                                        name={`question_${questionId}`}
                                        max={10}
                                        min={1}
                                        className="w-full bg-gray-100 border border-gray-300  text-slate-900
                                        rounded-lg px-4 py-2 outline-none"
                                    />
                                    <button onClick={submitAnswer}
                                        className='bg-slate-200 text-slate-800 w-fit px-3 py-2 rounded-md
                                 items-center mx-auto mt-3'
                                    >Submit</button>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Close Survey
                    </button>
                </div>
            </form >
        </div >
    );
};

export default Feedback;
