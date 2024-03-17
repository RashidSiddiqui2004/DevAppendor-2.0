
import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import {
    Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, setDoc, getDoc, updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { where } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
// import encryptor from '../../utils/Encrypt';
// import decryptor from '../../utils/Decrypt';

function myState(props) {

    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    const generateFormURL = async (creatorID, eventName, description, fields) => {

        if (creatorID == null) {
            return toast.error("You are not authenticated!")
        }

        else if (eventName == "") {
            return toast.error("Event name is required!");
        }

        else if (fields == null) {
            return toast.error("Atleast 1 field is required!")
        }

        try {

            const formRef = collection(fireDB, 'forms');

            const formFields = [];

            fields.forEach((field) => {
                const { value, dataType, isNeccesary, numOptions, options } = field;

                let fieldName = "";

                for (let i = 0; i < value.length; i++) {
                    if (value[i] == ' ') continue;

                    fieldName += value[i];
                }

                formFields.push({
                    fieldName: fieldName,
                    realName: value,
                    isNeccesary,
                    datatype: dataType,
                    numOptions: numOptions,
                    options: options,
                    responses: [],
                });

            });

            const formObject = {
                creatorID: creatorID,
                eventName: eventName,
                eventDescription: description,
                fields: formFields,
                numberofResponses: 0,
                time: Timestamp.now(),
            }

            // console.log(formFields);

            const docRef = await addDoc(formRef, formObject);

            const formID = docRef.id;

            const baseURL = 'https://devappendor.web.app/appends/';

            const formURL = baseURL + formID;

            toast.success("Form Created", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

            return formURL;

        } catch (error) {
            console.error('Error creating form:', error);
            return false;
        }
    }

    const getForm = async (formID) => {

        const formsRef = doc(fireDB, 'forms', formID);

        try {
            const formDoc = await getDoc(formsRef);

            if (formDoc.exists()) {
                const data = { id: formDoc.id, ...formDoc.data() };

                const formStructureFetched = data;

                return formStructureFetched;
            }
        } catch (error) {
            console.error('Error :', error);
            return false;
        }
    }

    const appendDetails = async (formID, formData) => {
        try {
            setLoading(true);

            const formRef = doc(fireDB, 'forms', formID);
            const formSnapshot = await getDoc(formRef);

            if (formSnapshot.exists()) {
                const prevResponseCount = formSnapshot.data().numberofResponses || 0;
                const prevFormState = formSnapshot.data().fields;

                const missingRequiredFields = Object.keys(prevFormState).filter(fieldName => {
                    const field = prevFormState[fieldName];

                    if (field.isNeccesary && !formData[fieldName]) {
                        toast.error(`Please fill ${field.realName}`);
                        setLoading(false);
                        return true;
                    }

                    return false;
                });

                if (missingRequiredFields.length > 0) {
                    return false;
                }

                const updatedFields = { ...prevFormState };

                Object.keys(formData).forEach(fieldName => {
                    const field = updatedFields[fieldName];

                    if (field) {
                        const encryptedData = formData[fieldName];
                        field.responses.push(encryptedData);
                    } else {
                        console.error(`Field '${fieldName}' does not exist in the form.`);
                    }
                });

                Object.keys(updatedFields).forEach(fieldName => {
                    const field = updatedFields[fieldName];

                    if (!field.isNecessary && !formData[fieldName]) {
                        field.responses.push("N/A");
                    }
                });

                const responsesCollectionRef = collection(fireDB, 'responses');

                await addDoc(responsesCollectionRef, {
                    formID,
                    formData,
                    timestamp: Timestamp.now(),
                });

                await setDoc(formRef, { fields: updatedFields, numberofResponses: prevResponseCount + 1 }, { merge: true });

                setLoading(false);

                return true;
            } else {
                console.error(`Form with ID '${formID}' does not exist.`);
            }
        } catch (error) {
            console.error('Error updating form data:', error);
            toast.error('Error updating form data. Please try again.');
        }
    };


    // const appendDetails2 = async (formID, formData) => {
    //     try {
    //         setLoading(true);
    //         const formRef = doc(fireDB, 'forms', formID);

    //         const formSnapshot = await getDoc(formRef);

    //         let missingField = null;

    //         if (formSnapshot.exists()) {
    //             const prevResponseCount = formSnapshot.data().numberofResponses || 0;
    //             const prevFormState = formSnapshot.data().fields;

    //             const missingRequiredFields = Object.keys(prevFormState).filter((fieldName) => {
    //                 const field = prevFormState[fieldName];

    //                 if (missingField == null && field.isNeccesary && !formData[fieldName]) {
    //                     missingField = field.fieldName;
    //                 }
    //                 return field.isNeccesary && !formData[fieldName];
    //             });

    //             if (missingRequiredFields.length > 0) {
    //                 toast.error(`Please fill ${missingField}`);
    //                 //   toast.error(`Please fill in the required fields: ${missingRequiredFields.join(', ')}`);
    //                 setLoading(false);
    //                 return false;
    //             }

    //             Object.keys(formData).forEach((fieldName) => {
    //                 const field = prevFormState[fieldName];

    //                 if (field) {
    //                     const encyptedData = formData[fieldName];
    //                     field.responses.push(encyptedData);
    //                 } else {
    //                     console.error(`Field '${fieldName}' does not exist in the form.`);
    //                 }
    //             }); 

    //             Object.keys(prevFormState).forEach((fieldName) => {
    //                 const field = prevFormState[fieldName];

    //                 if (!field.isNecessary && !formData[fieldName]) {
    //                     field.responses.push("N/A");
    //                 }
    //             });

    //             await setDoc(formRef, { fields: prevFormState, numberofResponses: prevResponseCount + 1 }, { merge: true });

    //             setLoading(false);

    //             return true;
    //         } else {
    //             console.error(`Form with ID '${formID}' does not exist.`);
    //         }
    //     } catch (error) {
    //         console.error('Error updating form data:', error); 
    //         toast.error('Error updating form data. Please try again.');
    //     }
    // };


    const collectData = async (formID) => {
        try {
            const formRef = doc(fireDB, 'forms', formID);
            const formSnapshot = await getDoc(formRef);

            if (formSnapshot.exists()) {
                const form = formSnapshot.data();
                const responsesCollectionRef = collection(fireDB, 'responses');

                // Get form responses
                const responsesQuery = query(responsesCollectionRef, where('formID', '==', formID));
                const responsesSnapshot = await getDocs(responsesQuery); 
                const responses = responsesSnapshot.docs.map(doc => doc.data());

                return { form, responses };
            } else {
                console.error(`Form with ID '${formID}' does not exist.`);
                return null;
            }
        } catch (error) {
            console.error('Error getting form responses:', error);
            return null;
        }
    }



    const collectData2 = async (formID) => {
        const formsRef = doc(fireDB, 'forms', formID);

        try {
            const formDoc = await getDoc(formsRef);

            if (formDoc.exists()) {
                const data = { id: formDoc.id, ...formDoc.data() };

                const formStructureFetched = data;

                return formStructureFetched;
            }
        } catch (error) {
            console.error('Error :', error);
            return false;
        }
    }


    const [myForms, setMyForms] = useState([]);

    const getMyForms = async (userID) => {
        setLoading(true)

        if (userID === undefined || userID === null) {
            return;
        }

        try {
            const q = query(
                collection(fireDB, 'forms'),
                where('creatorID', '==', userID),
                orderBy('time', 'desc')
            );

            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                let myForms = [];
                QuerySnapshot.forEach((doc) => {
                    myForms.push({ ...doc.data(), id: doc.id });
                });

                setMyForms(myForms);

                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            let myPostArray = [];
            setMyForms(myPostArray);
            setLoading(false);
        }
    }

    const dropResponse = async (responseID) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'responses', responseID))
            toast.success('Response deleted !')
            getMyForms();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }






    const [reports, setReports] = useState([]);

    const getAllReports = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'reports'),
                orderBy('timestamp', 'asc'),
                where('filed', "==", false)
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let reportsArray = [];

                QuerySnapshot.forEach((doc) => {
                    reportsArray.push({ ...doc.data(), id: doc.id });
                });
                setReports(reportsArray);
                setLoading(false);

            });

            return true;

        } catch (error) {
            setLoading(false)
            return false;
        }

    }



    const UpdateReportState = async (reportId) => {
        try {
            // Get a reference to the specific report document
            const reportRef = doc(fireDB, 'reports', reportId);

            // Get the current data of the report
            const reportSnapshot = await getDoc(reportRef);
            const reportData = reportSnapshot.data();

            // Check if the 'filed' attribute exists
            if (reportData && reportData.filed !== undefined) {
                // 'filed' attribute exists, update it to true
                await updateDoc(reportRef, { filed: true });
            } else {
                // 'filed' attribute doesn't exist, add it and set to true
                await setDoc(reportRef, { filed: true }, { merge: true });
            }

        } catch (error) {
            console.error('Error updating report state:', error);
        }
    }

    const [posts, setPosts] = useState({
        title: "",
        description: "",
        author: null,
        authorId: "",
        location: "",
        category: "",
        imageUrl: null,
        tags: null,
        likes: 0,
        supports: 0,
        flags: 0,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addPost = async () => {

        if (posts.title == null || posts.category == null || posts.description == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const postRef = collection(fireDB, 'posts');
            await addDoc(postRef, posts)
            toast.success("Added post successfully");

            setTimeout(() => {
                window.location.href = '/community-posts'
            }, 800);

            getPostData();

            setLoading(false)

            return true;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [post, setPost] = useState([]);

    const getPostData = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'posts'),
                orderBy('time', 'desc')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let postArray = [];
                QuerySnapshot.forEach((doc) => {
                    postArray.push({ ...doc.data(), id: doc.id });
                });
                setPost(postArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getPostData();
    }, []);


    // update post function
    // const updatePost = async () => {
    // setLoading(true)
    // try {

    //     await setDoc(doc(fireDB, 'posts', posts.id), posts)
    //     toast.success("Post Updated successfully")
    //     setTimeout(() => {
    //         window.history.back();
    //     }, 800);
    //     getPostData();
    //     setLoading(false)

    // } catch (error) {
    //     console.log(error)
    //     setLoading(false)
    // }
    // }

    // delete post


    return (
        <MyContext.Provider value={{
            mode, loading, setLoading,
            generateFormURL, getForm, collectData, appendDetails,
            dropResponse,
            myForms, getMyForms,
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState