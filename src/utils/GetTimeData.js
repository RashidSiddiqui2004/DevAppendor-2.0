
const getTimeDetails = (time) => {
    const jsDate = time.toDate();
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1;
    const day = jsDate.getDate();
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();

    const creationDate = `Date: ${day}-${month}-${year}`;
    const timeStamp = `Time: ${hours}:${minutes}:${seconds}`;

    return [creationDate, timeStamp];
}

export default getTimeDetails;