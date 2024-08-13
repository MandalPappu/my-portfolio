import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import resumeModel from "@/models/resume.model";


export async function DELETE(req:NextRequest) {
    await dbConnect();
    try {
        const { _id } = await req.json()
        
        if (!_id) {
            return NextResponse.json({
                success: false,
                message: "resume not found",
            }, { status: 200 });
        }

        await resumeModel.findByIdAndDelete(_id);
          
        return NextResponse.json({
            success: true,
            message: "resume is deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete resume", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}