import type {NextFunction, Request, Response} from "express"
import { JWT_PUBLIC_KEY } from "./config";
import jwt from "jsonwebtoken"

export function middleware(req:Request, res:Response, next:NextFunction){
    const token = req.header('authorization')
    if(!token){
         res.status(401).json({error:"Unautherised"})
         return
    }

    const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
    console.log(decoded)
    if(!decoded || !decoded.sub){
        res.status(401).json({error:"Unathorused"})
        return;
    }

    req.userId = decoded.sub as string;
    if(!req.userId){
        res.status(401).json({error:"Unathorused"})
        return;
    }
    next();
}
