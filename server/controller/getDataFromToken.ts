// import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';


// export default function getDataFromToken(request : Request){
//     try{
//         const token = request.cookies?.token || "";

//         console.log("🚀 ~ getDataFromToken ~ token:", token)
//         const decodedToken:any = jwt.verify(token,"MyTypescriptLearning");
//         return decodedToken.id; 
//     } catch(error:any){
//         console.log("bye bye")
//         throw new Error(error.message);
//     }
// }


export default function getDataFromToken(token: string) {
    try {
        // const token = request.cookies?.token;
        if (!token) {
            throw new Error("Token is undefined");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: any = jwt.verify(token, "MyTypescriptLearning");

        console.log("🚀 ~ getDataFromToken ~ decodedToken:", decodedToken)
    
        const userId = (decodedToken.id as string);
        return userId; // return the entire decoded token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("bye bye");
        throw new Error(error.message);
    }
}


