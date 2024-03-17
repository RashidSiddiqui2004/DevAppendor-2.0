
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig"; 

async function getUsernameByUID(uid) { 
    const usersCollection = collection(fireDB, 'users');  
    const userQuery = query(usersCollection, where('uid', '==', uid));

    try {
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const username = userDoc.data().name;

            return username;
        } else {
            console.log('User not found.');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }

    return null;

}

export default getUsernameByUID;

