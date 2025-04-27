import { randomUUIDv7 } from "bun";
import type {OutgoingMessage, SignupOutgoingMessage, ValidateOutgoingMessage} from "common/types"
import nacl from "tweetnacl"
import nacl_util from "tweetnacl-util"
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58"; 

const CALLBACKS:{[callbackId:string]:(data:SignupOutgoingMessage)=>void}={}

let validatorId: string | null = null;

async function main(){
    console.log("Private key: ", process.env.PRIVATE_KEY)
    const keypair = Keypair.fromSecretKey(
        bs58.decode(process.env.PRIVATE_KEY!)
    );
    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage=async(event)=>{
        console.log("Messaging coing line 20")
        console.log(event)
        const data:OutgoingMessage = JSON.parse(event.data);
        if(data.type=="signup"){
            CALLBACKS[data.data.callbackId]?.(data.data)
            delete CALLBACKS[data.data.callbackId] 
        }else if(data.type=='validate'){
            await validateHandler(ws, data.data, keypair)
        }
    }

    ws.onopen = async () => {
        console.log("ws open line 32")

        const callbackId = randomUUIDv7();
        CALLBACKS[callbackId] = (data: SignupOutgoingMessage) => {
            validatorId = data.validatorId;
        }
        const signedMessage = await signMessage(`Signed message for ${callbackId}, ${keypair.publicKey}`, keypair);
        console.log({
            callbackId,
            ip: '127.0.0.1',
            publicKey: keypair.publicKey,
            signedMessage,
        })

        ws.send(JSON.stringify({
            type: 'signup',
            data: {
                callbackId,
                ip: '127.0.0.1',
                publicKey: keypair.publicKey,
                signedMessage,
            },
        }));
    }
}

async function validateHandler(ws:WebSocket, {url, callbackId, websiteId}:ValidateOutgoingMessage, keypair:Keypair) {
    console.log(`validating ${url} line 53`)
    const startTime = Date.now();
    const signature = await signMessage(`Replying to ${callbackId}`, keypair);

    try {
        const response = await fetch(url)
        const endTime = Date.now();
        const latency = endTime-startTime;
        const status = response.status

        console.log(url)
        console.log(status)

        ws.send(JSON.stringify({
            type:'validate',
            data:{
                callbackId,
                status: status==200 ?'Good':'Bad',
                latency,
                websiteId,
                validatorId,
                signedMessage:signature
            }
        }))
    } catch (error) {
        ws.send(JSON.stringify({
            type:'validate',
            data:{
                callbackId,
                status:'Bad',
                latency:1000,
                websiteId,
                validatorId,
                signedMessage: signature
            }
        }))
        console.log(error)
    }
}

async function signMessage(message: string, keypair: Keypair) {
    const messageBytes = nacl_util.decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);

    return JSON.stringify(Array.from(signature));
}

main();

setInterval(async () => {

}, 10000);