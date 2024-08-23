import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import dbConnect from "@/helpers/dbConfig";
import bcrypt from "bcryptjs"


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const reqbody = await req.json();
        const { email, password } = reqbody;
        if (!email || !password) {
            return NextResponse.json({
                message: "all fields are required"
            })
        }
        const user = await User.findOne({ email: process.env.ADMIN_CREDENTIAL })

        if (user) {
            return NextResponse.json({
                success: false,
                message: "Admin already exists"
            }, { status: 401 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({ email, password: hashedPassword })
        
        return NextResponse.json({
            success: true,
            message: "user registered successfully",
        },{status:200})


    } catch (error) {
        console.log("error in signup", error);
        return NextResponse.json({
            success: false,
            message: "signup failed!"
        }, { status: 500 })
    }
}