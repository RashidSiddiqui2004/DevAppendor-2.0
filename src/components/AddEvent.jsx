
import React, { useContext, useEffect, useRef, useState } from 'react'
import myContext from '../context/data/myContext';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import getUsernameByUID from '../utils/GetUser';
import { auth } from '../firebase/FirebaseConfig';

const AddEvent = () => {

    const context = useContext(myContext)
    const { generateFormURL } = context;

    const [eventName, setEventName] = useState('');
    const [description, setDesc] = useState("");

    const [fields, setFields] = useState([
        { name: 'Field 1', value: '', dataType: 'text', isNecessary: true, numOptions: 0 , options: [] }
    ]);

    const [formUrl, setFormUrl] = useState("");
    const [preview, setPreview] = useState(false);
    const [urlState, setShowURL] = useState(false);

    // const handleFieldChange = (index, value) => {
    //     const newFields = [...fields];
    //     newFields[index].value = value;
    //     setFields(newFields);
    // };

    const handleFieldChange = (index, value) => {
        const newFields = [...fields];
        newFields[index].value = value;

        if (newFields[index].dataType === 'multi-choice') {
            newFields[index].options = [];
            newFields[index].numOptions = 0;
        }

        setFields(newFields);
    };

    const editorRef = useRef(null);
    const eventRef = useRef();

    const uid = auth?.currentUser?.uid;

    // console.log(JSON.parse(localStorage.getItem('user'))?.user?.uid); 

    const user_emailID = JSON.parse(localStorage.getItem('user'))?.user?.email;

    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) {
            setUser(username);
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });

    const handleDataTypeChange = (index, dataType) => {
        const newFields = [...fields];
        newFields[index].dataType = dataType;
        setFields(newFields);
    };

    const handleNecessaryChange = (index, newValue) => {
        const newFields = [...fields];
        newFields[index].isNeccesary = newValue;
        setFields(newFields);
    }

    const handleNumOptionsChange = (fieldName, numOptions) => {
        const newFields = [...fields]; 
        const index = newFields.findIndex(field => field.name === fieldName);

        if (index !== -1) {
            newFields[index].numOptions = parseInt(numOptions, 10) || 0;

            // Reset the options array when changing the number of options
            newFields[index].options = Array(newFields[index].numOptions).fill('');
        }
 
        setFields(newFields);
    };

    const handleOptionValueChange = (fieldName, optionIndex, optionValue) => {
        const newFields = [...fields];
        const index = newFields.findIndex(field => field.name === fieldName);

        if (index !== -1) {
            newFields[index].options[optionIndex] = optionValue;
        }

        setFields(newFields);
    };


    const handleAddField = () => {
        const newField = { name: `Field ${fields.length + 1}`, value: '', dataType: 'text', isNeccesary: false,numOptions: 0, options: [] };
        setFields([...fields, newField]);
    };

    const handleGetFormLink = async () => {

        const descripn = await editorRef.current.getContent();

        setDesc(descripn);

        if (description.trim() === '') return toast.info("Form description is empty!");

        const url_form = await generateFormURL(uid, eventName, description, fields);

        setFormUrl(url_form);

        setShowURL(true);
    };


    function copyToClipboard(url) {
        const urlToCopy = url;

        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = urlToCopy;
        document.body.appendChild(tempInput);

        // Select the text inside the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);

        // Copy the text to the clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        const messagePointer = document.getElementById('copyConf');

        messagePointer.classList.remove('hidden');

        setTimeout(() => {
            messagePointer.classList.add('hidden');
        }, 1000);

    }

    const copyURL = () => {
        copyToClipboard(formUrl);
    }

    useEffect(() => {
        eventRef.current.focus();
    }, [])


    return (

        <div className='overflow-hidden pb-8'>
            <h1 className='text-slate-200 font-sans font-semibold text-2xl mt-5'>Add a new Event</h1>
            <div className='mx-[2%] rounded-lg py-3 my-4 min-h-5'>

                <div className='md:flex md:flex-row gap-x-2 lg:flex lg:justify-center'>
                    <label htmlFor="eventName" className='text-left lg:mt-3'>Event Name *</label>
                    <div>
                        <input
                            type="text"
                            ref={eventRef}
                            className='bg-slate-600 outline-none rounded-md
                             border-none text-white px-7 my-2 py-1 text-center'
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='gap-x-2 lg:justify-center mt-2'>
                    <label htmlFor="eventName" className='text-left'>Description to add on form *</label>
                    <div className='block lg:hidden mx-2 my-2'>
                        <Editor
                            onChange={() => {
                                const descripn = editorRef.current.getContent();
                                setDesc(descripn);
                            }}

                            apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            init={{
                                menubar: false,
                                height: 350,
                                width: 380,
                                plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link | align lineheight | numlist bullist | emoticons | removeformat',
                            }}
                            initialValue=""
                        />
                    </div>

                    <div className='hidden lg:block ml-[27%] mt-3'>
                        <Editor
                            onChange={() => {
                                const descripn = editorRef.current.getContent();
                                setDesc(descripn);
                            }}
                            apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            init={{
                                menubar: false,
                                width: 600,
                                height: 200,
                                plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link | align lineheight | numlist bullist | emoticons | removeformat',
                            }}
                            initialValue=""
                        />
                    </div>
                </div>

                <h2 className='text-2xl text-center my-2 font-semibold lora'>Form Layout</h2>

                {fields.map((field, index) => (

                    <div key={index}>
                        <div className='flex flex-row gap-x-2'>
                            <div className='w-[65%] lg:w-[50%]'>
                                <label htmlFor={`field${index}`} className='text-left'>{field.name}</label>
                                <div>
                                    <input
                                        type="text"
                                        id={`field${index}`}
                                        className='bg-slate-600 outline-none border-none rounded-lg text-white px-7 my-2 py-1 text-center w-[85%]'
                                        value={field.value}
                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className='w-[25%]'>
                                <label htmlFor={`dataType${index}`} className='text-left'>DataType</label>
                                <div>
                                    <select
                                        id={`dataType${index}`}
                                        value={field.dataType}
                                        onChange={(e) => handleDataTypeChange(index, e.target.value)}
                                        className='bg-slate-600 outline-none border-none rounded-lg text-white px-7 my-2 py-1 text-center w-[40%] md:w-full'
                                        required
                                    >
                                        <option value="" disabled>Select Data type</option>
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="date">Date</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="mutli-choice">MCQ</option>
                                    </select>
                                </div>
                            </div>


                            <div className='flex items-center w-[10%] mt-6 ml-8'>
                                <label htmlFor={`necessary${index}`} className='text-white mr-2'>Required</label>
                                <input
                                    type="checkbox"
                                    id={`necessary${index}`}
                                    checked={field.isNecessary}
                                    onChange={() => handleNecessaryChange(index, !field.isNecessary)}
                                    className='form-checkbox text-indigo-600 h-4 w-4 ml-2'
                                />
                            </div>

                        </div>


                        {(field?.dataType === 'mutli-choice') ? (
                            <div>
                                <label htmlFor={`numOptions${field.name}`} className="text-white">
                                    Number of Options
                                </label>
                                <input
                                    type="number"
                                    id={`numOptions${field.name}`}
                                    name={`numOptions${field.name}`}
                                    placeholder="Enter number of options"
                                    onChange={(e) => handleNumOptionsChange(field.name, e.target.value)}
                                    value={field.numOptions || ''}
                                    className="bg-slate-600 ml-2 outline-none rounded-md border-none text-white px-7 my-2 py-1 text-center"
                                    required
                                />

                                {Array.from({ length: field.numOptions || 0 }, (_, index) => (
                                    <div key={index}>
                                        <label htmlFor={`option${index + 1}_${field.name}`} className="text-white">
                                            Option {index + 1}
                                        </label>
                                        <input
                                            type="text"
                                            id={`option${index + 1}_${field.name}`}
                                            name={`option${index + 1}_${field.name}`}
                                            placeholder={`Enter option ${index + 1}`}
                                            onChange={(e) => handleOptionValueChange(field.name, index, e.target.value)}
                                            value={field.options[index] || ''}
                                            className="bg-slate-600 outline-none ml-2 rounded-md border-none text-white px-7 my-2 py-1 text-center"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}


                    </div>
                ))}

                <div className='flex flex-col justify-center'>
                    <button
                        className='bg-gray-600 text-slate-100 font-bold my-3 py-4 px-5 
                        rounded-md w-fit ml-[30%] lg:ml-[45%] hover:scale-95 transition-all'
                        onClick={handleAddField}
                    >
                        Add New Field
                    </button>

                    <button
                        className='bg-green-300 text-slate-800 font-bold my-3 py-4 px-5 lg:px-32
                        rounded-md w-fit ml-[25%] lg:ml-[35%] hover:scale-95 transition-all'
                        onClick={handleGetFormLink}
                    >
                        Get My Form Link
                    </button>
                </div>

                {urlState ?
                    <div className='bg-slate-800 text-white w-fit mt-2 text-2xl
                 py-3 px-4 mx-[30%] md:px-16 md:mx-[40%] rounded-md font-bold shadow-md shadow-blue-200 
                 cursor-pointer'
                        onClick={copyURL}>
                        Copy Link
                    </div>
                    : <>
                    </>}

                <div className='text-slate-200 text-xl rounded-lg px-4 hidden
                     mt-2 text-center pb-5 transition-all border-b-slate-200 border-b-2' id='copyConf'>
                    <p className='mt-5'>Copied to Clipboard</p>
                </div>
            </div>
 
        </div>
    );
}

export default AddEvent