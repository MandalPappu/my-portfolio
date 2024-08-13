import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import uploadToCloudinary from "@/helpers/cloudinary";
import resumeModel from "@/models/resume.model";




export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const resume = formData.get("resume") as File
        if (!resume) {
            return NextResponse.json({
                success: false,
                message: "resume is required"
            }, { status: 401 })
        }
        const myResume: any = await uploadToCloudinary(resume, "next-galleryImage");
        const myResumeUrl = myResume.url

        if (!myResumeUrl) {
            return NextResponse.json({
                success: false,
                message: "resume file not found"
            }, { status: 401 })
        }
        await resumeModel.create({
            resume: myResumeUrl
        });

        return NextResponse.json({
            success: true,
            message: "resume are uploaded",
        }, { status: 200 })

    } catch (error) {
        console.log("error in uploads resume", error);
        return NextResponse.json({
            success: false,
            message: "uploading error"
        }, { status: 500 })

    }
}