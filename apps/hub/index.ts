import { connect, randomUUIDv7, type ServerWebSocket } from "bun";
import {prismaClient} from "db/client"
import {PublicKey} from "@solana/web3.js"
import nacl from "tweetnacl"
import nacl_util from "tweetnacl-util"
import type { IncomingMessage, SignupIncomingMessage } from "common/types";

const availableValidators:{validatorId:string, socket:ServerWebSocket<unknown>, publicKey:string}[] = [];

const CALLBACKS: {[callbackId:string]:(data:IncomingMessage)=>void}={};
const COST_PER_VALIDATION = 100;

Bun.serve({
    fetch(req, server){
        if(server.upgrade(req)){
            return;
        }
        return new Response("updgrade failed", {status:500});
    },
    port:8081,
    websocket:{
        async message(ws, message:string) {
            const data:IncomingMessage = JSON.parse(message);
            if(data.type==='signup'){
                console.log("singing")
                console.log(data)
                const verified = await verifyMessage(
                    `Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,
                    data.data.publicKey,
                    data.data.signedMessage
                )
                console.log("verified: ", verified)
                if(verified){
                    await signupHandler(ws, data.data)
                }
            }else if(data.type=='validate'){
                console.log("Validation is srtargin line 37")
                CALLBACKS[data.data.callbackId](data); //where is this function being called
                delete CALLBACKS[data.data.callbackId] //where is this deleteing from
            }

        },
        async close(ws: ServerWebSocket<unknown>) {
            console.log(availableValidators)
            // availableValidators.splice(availableValidators.findIndex(v => v.socket === ws), 1);
            // console.log("closing: ", availableValidators)
        }
    }
})

async function signupHandler(ws:ServerWebSocket<unknown>, {ip, publicKey, signedMessage, callbackId}:SignupIncomingMessage){
    const validatorDB = await prismaClient.validator.findFirst({
        where:{
            publicKey
        }
    })

    if(validatorDB){
        ws.send(JSON.stringify({
            type:'signup',
            data:{
                validatorId: validatorDB.id,
                callbackId
            }
        }))

        availableValidators.push({
            validatorId:validatorDB.id,
            socket:ws,
            publicKey:validatorDB.publicKey
        })
        return;
    }

    const validator = await prismaClient.validator.create({
        data:{
            ip, 
            publicKey,
            location:"unknown"
        }
    })

    ws.send(JSON.stringify({
        type:'signup',
        data:{
            validatorId: validator.id,
            callbackId
        }
    }))

    availableValidators.push({
        validatorId:validator.id,
        socket:ws,
        publicKey:validator.publicKey
    })
}

async function verifyMessage(message:string, publicKey:string, signature:string){
    const messageBytes = nacl_util.decodeUTF8(message)
    console.log("messageBytes: ", messageBytes)
    console.log("result")
    const result = nacl.sign.detached.verify(
        messageBytes,
        new Uint8Array(JSON.parse(signature)),
        new PublicKey(publicKey).toBytes()
    )
    console.log("result")
    return result;
}

setInterval(async()=>{
    const websitesToMonitor = await prismaClient.website.findMany({
        where:{
            disabled:false,
        }
    })

    for(const website of websitesToMonitor){
        availableValidators.forEach(validator=>{
            const callbackId = randomUUIDv7();
            console.log(`Sending validate to ${validator.validatorId} ${website.url}`);
            validator.socket.send(JSON.stringify({
                type:'validate',
                data:{
                    url:website.url,
                    callbackId,
                    websiteId:website.id
                }
            }))

            CALLBACKS[callbackId] = async (data:IncomingMessage)=>{
                console.log("Validation callback function")
                if(data.type=='validate'){
                    const {validatorId, status, latency, signedMessage} = data.data;
                    const verified = await verifyMessage(
                            `Replying to ${callbackId}`,
                            validator.publicKey,
                            signedMessage
                    )
                    if(!verified){
                        return;
                    }

                    await prismaClient.$transaction(async (tx) => {
                        await tx.websiteTick.create({
                            data: {
                                websiteId: website.id,
                                validatorId,
                                status,
                                latency,
                                createdAt: new Date()
                            }
                        })
                    
                        await tx.validator.update({
                            where: { id: validatorId },
                            data: {
                                pendingPayouts: { increment: COST_PER_VALIDATION }
                            }
                        })
                    })
                }
            }
        })
    }
}, 60*1000)