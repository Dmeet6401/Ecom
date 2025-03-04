import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

Connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // console.log("🚀 ~ file: route.ts:14 ~ POST ~ reqBody:", reqBody)
        
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                error: "user not found",
                status: 400, 
            })
        }

        //check password is correct 

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({
                error: "Invalid password",
                status: 400, 
            })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;



    } catch(error : any){
        return NextResponse.json({error : error.message}, {status : 500})
    }
}
