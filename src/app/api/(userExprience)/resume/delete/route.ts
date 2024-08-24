import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import resumeModel from "@/models/resume.model";
import { deleteOnCloudinary } from "@/helpers/cloudinary";

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

        const res = await resumeModel.findByIdAndDelete(_id);
        console.log(res);
        
        const ResumeImg = res?.resume?.split("/");
        const img = ResumeImg?.pop();
        const imgName = img?.split(".")[0]
        const imgFile = `${"my-portfolio/myworkfolio-skill-images"}/${imgName}`
          
        const deleteRes = await deleteOnCloudinary(imgFile);
        
        if (deleteRes.result === "ok") {
            return NextResponse.json({
                success: true,
                message: "resume is deleted",
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "deleting error",
            }, { status: 200 })
}

    } catch (error) {
        console.log("error in delete resume", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}