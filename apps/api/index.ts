import express, { response } from "express"
import type { Request, Response } from "express";
import { middleware } from "./middleware";
import { prismaClient } from "db/client";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())

app.post("/api/v1/website", middleware, async (req: Request, res: Response) => {
    const userId:String = req.userId!;
    const {url} = req.body;
    const data = await prismaClient.website.create({
        data: {
            userId: userId as string,
            url: url as string,
            disabled: false
        }
    })
    res.json({id:data.id})
})

app.get("/api/v1/website/status", middleware, async (req: Request, res: Response) => {
    const websiteId = req.query.websiteId as string;
    const userId = req.userId;

    const data = await prismaClient.website.findFirst({
        where:{
            id:websiteId,
            userId: userId as string,
            disabled:false
        },
        include:{
            ticks:true
        }
    })

    res.json(data)
})

app.get("/api/v1/websites", middleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    const websites = await prismaClient.website.findMany({
        where:{
            userId: userId as string,
            disabled:false
        },
        include:{
            ticks:true
        }
    })
    res.json({
        websites
    })
})

app.delete("/api/v1/website", middleware, async (req: Request, res: Response) => {
    const userId = req.userId;
    const websiteId = req.query.websiteId

    const response = await prismaClient.website.update({
        where:{
            id:websiteId as string,
            userId: userId as string
        },
        data:{
            disabled:true
        }
    })

    res.json(response)
})

app.listen(8080)