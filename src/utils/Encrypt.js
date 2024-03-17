
function generateAsciiArray(input) {
    const asciiArray = [];

    for (let i = 0; i < input.length; i++) {
        asciiArray.push(input.charCodeAt(i));
    }

    return asciiArray;
}

function reverseNumber(number) {
    const reversed = parseInt(number.toString().split('').reverse().join(''), 10);
    const reversedString = reversed.toString().padStart(number.toString().length, '0');
    return reversedString;
}

function reverseNums(charArray) {
    const asciiReverse = [];

    for (let i = 0; i < charArray.length; i++) {
        let reverseNum = reverseNumber(charArray[i]);
        asciiReverse.push(reverseNum);
    }

    return asciiReverse;
}

function decrementDigitsByOne(number) {
    const numberString = number.toString();
    let result = '';

    for (let i = 0; i < numberString.length; i++) {
        const digit = parseInt(numberString[i], 10);
        const decrementedDigit = (digit - 1 + 10) % 10;
        result += decrementedDigit.toString();
    }

    return result;
}

function subtractNums(reverseNums) {
    const modifiedArr = [];

    for (let i = 0; i < reverseNums.length; i++) {
        let reverseNum = decrementDigitsByOne(reverseNums[i]);
        modifiedArr.push(reverseNum);
    }

    return modifiedArr;
}

function generateStringFromAsciiCodes(asciiCodes) {
    return asciiCodes.map(code => String.fromCharCode(code)).join('');
}

const encryptor = (data) => { 
    const asciiCodes = generateAsciiArray(data);
    const asciiRev = reverseNums(asciiCodes);
    const encryptedData = subtractNums(asciiRev);
    return encryptedData;
}

export default encryptor;

// const data = "http://localhost:5173/thread-reply/O2NhgEcFzPuM9debd6Ib";
// const asciiCodes = generateAsciiArray(data);
// const asciiRev = reverseNums(asciiCodes);
// const modifiedArr = subtractNums(asciiRev);

// const encodedData = generateStringFromAsciiCodes(modifiedArr);


console.log(modifiedArr);


