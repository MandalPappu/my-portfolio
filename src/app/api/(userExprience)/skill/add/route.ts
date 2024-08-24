import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import uploadOnCloudinary from "@/helpers/cloudinary";
import skillModel from "@/models/skills.model";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const skillImage = formData.get("skillImage") as File
        const skillName = formData.get("skillName")
        if (!skillName || !skillImage) {
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, { status: 401 })
        };
        const skillImages: any = await uploadOnCloudinary(skillImage, "my-portfolio/myworkfolio-skill-images");
        
        const skillImageUrl = skillImages.url

        if (!skillImageUrl) {
            return NextResponse.json({
                success: false,
                message: "image file not found"
            }, { status: 401 })
        }
        await skillModel.create({
            skillName,
            skillImage: skillImageUrl
        })

        return NextResponse.json({
            success: true,
            message: "skills are uploaded",
        }, { status: 200 })

    } catch (error) {
        console.log("error in uploads skills", error);
        return NextResponse.json({
            success: false,
            message: "uploading error"
        }, { status: 500 })

    }
}