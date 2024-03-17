

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

function reverseNums(charArray){
    const asciiReverse = [];

    for (let i = 0; i < charArray.length; i++) {
        let reverseNum = reverseNumber(charArray[i]);
        asciiReverse.push(reverseNum);
    }

    return asciiReverse;
}

function incrementDigitsByOne(number) {
    const numberString = number.toString();
    let result = '';

    for (let i = 0; i < numberString.length; i++) {
        const digit = parseInt(numberString[i], 10);
        const incrementedDigit = (digit + 1 + 10) % 10;  
        result += incrementedDigit.toString();
    }

    return result;
}

function addNums(reverseNums) {
    const modifiedArr = [];

    for (let i = 0; i < reverseNums.length; i++) {
        let reverseNum = incrementDigitsByOne(reverseNums[i]);
        modifiedArr.push(reverseNum);
    }

    return modifiedArr;
}

function generateStringFromAsciiCodes(asciiCodes) {
    return asciiCodes.map(code => String.fromCharCode(code)).join('');
}

const decryptor = (data) => { 
    const modifiedArr = addNums(data);
    const asciiRev = reverseNums(modifiedArr);
    const decodedData = generateStringFromAsciiCodes(asciiRev); 

    return decodedData;
}

export default decryptor;

// const data = [
//     '390', '500', '500', '100', '74',  '63',
//     '63',  '790', '000', '88',  '68',  '790',
//     '390', '000', '400', '500', '74',  '24',
//     '83',  '44',  '04',  '63',  '500', '390',
//     '300', '090', '68',  '990', '43',  '300',
//     '090', '100', '790', '010', '63',  '86',
//     '94',  '76',  '390', '290', '85',  '88',
//     '96',  '110', '97',  '600', '66',  '64',
//     '990', '090', '78',  '990', '34',  '26',
//     '78'
//   ]
// const modifiedArr = addNums(data);
// const asciiRev = reverseNums(modifiedArr);
// const decodedData = generateStringFromAsciiCodes(asciiRev); 

// console.log(decodedData);


