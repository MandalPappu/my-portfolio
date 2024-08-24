import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import resumeModel from "@/models/resume.model";
import uploadOnCloudinary from "@/helpers/cloudinary";



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
        const myResume: any = await uploadOnCloudinary(resume, "my-portfolio/myworkfolio-skill-images");
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