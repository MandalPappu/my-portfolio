import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import skillModel from "@/models/skills.model";

export async function POST(req:NextRequest) {
    await dbConnect();
    try {
        const {id} =await req.json()
        const res = await skillModel.findByIdAndDelete({_id:id})
        console.log(res);
        
        return NextResponse.json({
            success: true,
            message: "deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete skill", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}