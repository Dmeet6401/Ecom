import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(req: NextRequest){
    try{
        
        const reqBody = await req.json();
        const {token} = reqBody;
        // console.log("🚀 ~ file: route.ts:12 ~ POST ~ token:", token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
            status: 200,
        })
        
        
    } catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}