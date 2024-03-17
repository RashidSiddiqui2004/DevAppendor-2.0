
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myContext from '../../context/data/myContext';
import Loader from '../loader/Loader';
import RenderHTMLContent from '../../utils/RenderHTMLContent'
import SubmissionSuccessMessage from './SubmissionSuccessMsg';
import UnauthNavbar from '../UnauthNavbar';
import Info from '../utilityClasses/Info';
// import Feedback from '../utilityClasses/Feedback';
// import SurveyModal from '../utilityClasses/FeedbackModal';

const Append = () => {

    const context = useContext(myContext)

    const { appendDetails, getForm, loading, setLoading } = context;

    const [title, setFormTitle] = useState('DevAppendor Form');
    const [formStructure, setFormStructure] = useState(null);
    const [description, setDescription] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [surveyNotDone, setSurveyDone] = useState(true);

    const params = useParams();
    const formID = params.id;

    const [formValues, setFormValues] = useState({});

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    function debounce(func, delay) {
        let timeoutId;

        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }

    const throttleSubmitForm = debounce(function () {
        appendDetails(formID, formValues).then((flag) => {
            if (flag) {
                setFormSubmitted(true);
                toast.success("Form Submitted", {
                    position: "top-right",
                    autoClose: 200,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        });
    }, 5000);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        throttleSubmitForm(formID, formValues);
    };

    useEffect(() => {

        const fetchForm = async () => {

            const form = await getForm(formID);

            setFormTitle(form?.eventName)
            setFormStructure(form?.fields);
            setDescription(form?.eventDescription)
        }

        fetchForm();

    }, [])

    return (
        <div className='lora pb-6'>

            {/* <Navbar /> */}

            <UnauthNavbar />

            <h1 className='text-2xl font-bold mt-3 '>{title}</h1>

            {loading && <Loader />}

            <div className='mx-5 my-2'>
                <RenderHTMLContent htmlContent={description} />
            </div>


            {formSubmitted ?

                <div>
                    <SubmissionSuccessMessage />

                    {/* {
                        surveyNotDone &&
                        <SurveyModal setSurveyDone={setSurveyDone}/>
                    } */}

                </div>

                :

                <>
                    <div className="flex flex-col  justify-center rounded-md text-slate-950
                     bg-gray-100 w-[80%] mx-[10%] md:w-[60%] px-[5%] md:mx-[20%] pt-5 mb-5 pb-5 mt-7
                      md:mt-5">
                        {formStructure &&
                            Object.keys(formStructure).map((fieldName) => {
                                const field = formStructure[fieldName];

                                let options = [];

                                if (field?.numOptions > 0) {
                                    options = field?.options;
                                }

                                switch (field.datatype) {
                                    case "boolean":
                                        return (
                                            <div key={field.fieldName} className="flex flex-col mb-4 md:mr-4">
                                                <label htmlFor={field.fieldName} className="">
                                                    {field.realName} {field.isNeccesary ? '*' : ''}
                                                </label>
                                                <select
                                                    key={field.fieldName}
                                                    value={formValues[field.fieldName] || ""}
                                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                                    className={'bg-slate-600 outline-none rounded-md border-none text-white px-7 my-2 py-1 text-center w-[70%] mx-[15%] md:w-full'}
                                                    required
                                                >
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </div>
                                        );

                                    case "multi-choice":
                                        return (
                                            <div key={field.fieldName} className="flex flex-col mb-4 md:mr-4">
                                                <label htmlFor={field.fieldName} className="">
                                                    {field.realName}  {field.isNeccesary ? '*' : ''}
                                                </label>
                                                <select
                                                    id={field.fieldName}
                                                    name={field.fieldName}
                                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                                    value={formValues[field.fieldName] || []}
                                                    className="bg-slate-600 outline-none rounded-md border-none text-white px-7 my-2 py-1 text-center"
                                                    required={field.isNeccesary}
                                                >
                                                    {field.options.map((option, optionIndex) => (
                                                        <option key={optionIndex} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        );

                                    case "long-text":
                                        return (
                                            <div key={field.fieldName} className="flex flex-col mb-4 md:mr-4">
                                                <label htmlFor={field.fieldName} className="text-white">
                                                    {field.realName} {field.isNeccesary ? '*' : ''}
                                                </label>
                                                <textarea
                                                    id={field.fieldName}
                                                    name={field.fieldName}
                                                    placeholder={`Enter ${field.realName}`}
                                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                                    value={formValues[field.fieldName] || ''}
                                                    className={`bg-slate-600 outline-none rounded-md border-none text-white px-4 py-2 resize-none ${field.isNeccesary ? 'border-red-500' : ''
                                                        }`}
                                                    required={field.isNeccesary}
                                                    rows={4} // Set the number of rows you want
                                                />
                                            </div>
                                        );

                                    case "number":
                                        return (
                                            <div key={field.fieldName} className="flex flex-col mb-4 md:mr-4">
                                                <label htmlFor={field.fieldName} className="">
                                                    {field.realName}  {field.isNeccesary ? '*' : ''}
                                                </label>
                                                <input
                                                    type={field.datatype}
                                                    min={0}
                                                    id={field.fieldName}
                                                    name={field.fieldName}
                                                    placeholder={`Enter ${field.realName}`}
                                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                                    value={formValues[fieldName] || ''}
                                                    className={`bg-slate-600 outline-none rounded-md border-none text-white px-7 my-2 py-1 text-center ${field.isNeccesary ? 'border-red-500' : ''
                                                        }`}
                                                    required={field.isNeccesary}
                                                />
                                            </div>
                                        );

                                    default:
                                        return (
                                            <div key={fieldName} className="flex flex-col mb-4 md:mr-4">
                                                <label htmlFor={fieldName} className="">
                                                    {field.realName}  {field.isNeccesary ? '*' : ''}
                                                </label>
                                                <input
                                                    type={field.datatype}
                                                    id={fieldName}
                                                    name={fieldName}
                                                    placeholder={`Enter ${field.realName}`}
                                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                                    value={formValues[fieldName] || ''}
                                                    className={`bg-slate-600 outline-none rounded-md border-none text-white px-7 my-2 py-1 text-center ${field.isNeccesary ? 'border-red-500' : ''
                                                        }`}
                                                    required={field.isNeccesary}
                                                />
                                            </div>
                                        );
                                }
                            })}
                    </div>

                    <button
                        className='bg-green-300 text-slate-800 w-fit mx-[35%] font-bold my-3 py-2 px-8 rounded-md'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Submit'}
                    </button>
                </>
            }


            <div className='bg-slate-600 w-fit px-3 py-2 mt-5
            mx-[22%] md:ml-[39%] shadow-md shadow-purple-500'>
                <h2 className='flex justify-center'>Developed with ❤️ by Rashid Siddiqui</h2>
            </div>


            <div className='fixed bottom-4 left-4'>
                <Info />
            </div>

        </div>
    )
}

export default Append