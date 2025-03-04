// import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';


export default function getDataFromToken(request : Request){
    try{
        const token = request.cookies.token?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken; 
    } catch(error:any){
        console.log("bye bye")
        throw new Error(error.message);
    }
}

