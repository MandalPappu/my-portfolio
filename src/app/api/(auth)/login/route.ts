import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import dbConnect from "@/helpers/dbConfig";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const reqbody = await req.json();
        const { email, password } = reqbody;
        if ( !email || !password) {
            return NextResponse.json({
                message: "all fields are required"
            })
        }
        const user = await User.findOne({ email })
        
        const rightPass = bcrypt.compare(password, user.password)

        if (!rightPass) {
            return NextResponse.json({
                success: false,
                message: "Password is wrong"
            }, { status: 401 })
        }

        const token = jwt.sign(
            { email, id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        )
        
        const res = NextResponse.json({
            success: true,
            message: "user Login successfully",
            userId: user._id
        });

        res.cookies.set("token", token);
        return res;

    } catch (error) {
        console.log("error in login", error);
        return NextResponse.json({
            success: false,
            message: "login failed!"
        }, { status: 500 })
    }
}