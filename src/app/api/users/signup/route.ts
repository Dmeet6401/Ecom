import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/helpers/mailer";




Connect()



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {name, username, email, password} = reqBody;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        })
        
        const savedUser = await newUser.save()

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        // console.log("🚀 ~ file: route.ts:34 ~ POST ~ savedUser:", savedUser)    
        // console.log("User saved:", savedUser)
        return NextResponse.json({message: "User created successfully"}, {status: 201});

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
