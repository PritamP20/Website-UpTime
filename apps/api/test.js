import nacl from 'tweetnacl';
import nacl_util from 'tweetnacl-util';
import bs58 from 'bs58';

// Original message
const callbackId = "f3acc2fe-cdcf-4feb-a856-7b5945eb010f";
const publicKey = "2zUQzdXcX7yb3AdwimiKiwTjXudSF9UFihFax95w7vbM";
const message = `Signed message for ${callbackId}, ${publicKey}`; // Replace with the original message that was signed

// The signed message (base64 array)
const signedMessage = [24,188,20,248,246,155,51,130,44,212,109,147,1,44,234,107,164,233,10,89,137,22,76,69,185,208,165,251,182,120,56,166,243,54,175,246,184,115,46,94,168,30,54,38,228,128,122,59,31,249,153,151,0,232,12,59,22,177,84,182,181,122,128,8]

// Convert public key to Uint8Array
const publicKeyBytes = bs58.decode(publicKey);

// Convert the signed message back into a Uint8Array
const signature = new Uint8Array(signedMessage);

// Convert the message to a Uint8Array (using UTF-8 encoding)
const messageBytes = nacl_util.decodeUTF8(message);

// Verify the signature
const isValid = nacl.sign.detached.verify(messageBytes, signature, publicKeyBytes);

console.log("Signature is valid:", isValid);
