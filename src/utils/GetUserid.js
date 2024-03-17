

async function getUserID() {

    try {
        const userid = await JSON.parse(localStorage.getItem('user'))?.user?.uid;
        return userid;

    } catch (error) {
        console.error('Error fetching USERID:', error);
        return null;
    }

}

export default getUserID;