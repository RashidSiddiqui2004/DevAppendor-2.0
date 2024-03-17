 
// import CryptoJS from 'crypto-js';

// const key = 'oj4%#fp25f#iw89##2nf93#$%^&';  

// function encryptDES(message) {
//     const encrypted = CryptoJS.DES.encrypt(message, key);
//     return encrypted.toString();
// }

// function decryptDES(ciphertext) {
//     const decrypted = CryptoJS.DES.decrypt(ciphertext, key);
//     return decrypted.toString(CryptoJS.enc.Utf8);
// } 

// const encrypto = {encryptDES, decryptDES};

// export default encrypto;
 
// const message = 'https://github.com/RashidSiddiqui2004/UrbanGuard';
// const ciphertext = encryptDES(message);
// console.log('Encrypted:', ciphertext);

// const decryptedMessage = decryptDES(ciphertext);
// console.log('Decrypted:', decryptedMessage);


// async function encryptAES(message, key) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(message);

//     // Import the key
//     const importedKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', true, ['encrypt']);

//     // Encrypt the data
//     const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) }, importedKey, data);

//     // Convert the encrypted data to a hexadecimal string
//     const encryptedHex = Array.from(new Uint8Array(encryptedData)).map(byte => byte.toString(16).padStart(2, '0')).join('');

//     return encryptedHex;
// }

// async function decryptAES(encryptedHex, key) {
//     // Convert the hexadecimal string to a Uint8Array
//     const encryptedData = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

//     // Extract the IV (first 12 bytes) and ciphertext (remaining bytes)
//     const iv = encryptedData.slice(0, 12);
//     const ciphertext = encryptedData.slice(12);

//     // Import the key
//     const importedKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', true, ['decrypt']);

//     // Decrypt the data
//     const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, importedKey, ciphertext);

//     // Convert the decrypted data to a string
//     const decoder = new TextDecoder();
//     const decryptedMessage = decoder.decode(decryptedData);

//     return decryptedMessage;
// }


// Example usage
// const encryptionKey = crypto.getRandomValues(new Uint8Array(16)); // 128-bit key for AES-128
// const originalMessage = 'This is a secret message!';

// encryptAES(originalMessage, encryptionKey).then(encrypted => {
//     console.log('Encrypted:', encrypted);

//     decryptAES(encrypted, encryptionKey).then(decrypted => {
//         console.log('Decrypted:', decrypted);
//     });
// });



// async function sha256(message) { 
//     const encoder = new TextEncoder();
//     const data = encoder.encode(message);

//     // Calculate the SHA-256 hash
//     const buffer = await crypto.subtle.digest('SHA-256', data);

//     // Convert the buffer to a hexadecimal string
//     const hashArray = Array.from(new Uint8Array(buffer));
//     const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

//     return hashHex;
// }

// // Example usage
// const message = 'Hello, SHA-256!';
// sha256(message).then(hash => {
//     console.log(`SHA-256 Hash of "${message}": ${hash}`);
// });
