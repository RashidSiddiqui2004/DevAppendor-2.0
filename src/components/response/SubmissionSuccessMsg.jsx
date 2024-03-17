
import React from 'react';

const SubmissionSuccessMessage = () => {
  return (
    <div className="text-slate-900 bg-purple-500 p-8 w-[80%] mx-[10%]
     md:w-[60%] md:mx-[20%]
    rounded-md text-center mt-12 mb-11 sm:mb-[2%]">
      <svg
        className="w-12 h-12 mx-auto mb-4 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7"></path>
      </svg>
      <p className="text-lg font-semibold mb-2">Response Recorded Successfully!</p>
      <p className="text-gray-200">
        Thank you for submitting your response.
      </p>
      <p className="text-gray-200">Your input is valuable to us.</p>
    </div>
  );
};

export default SubmissionSuccessMessage;
