import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import uploadToCloudinary from "@/helpers/cloudinary";
import projectModel from "@/models/projects.model";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const projectImage = formData.get("projectImage") as File
        const projectName = formData.get("projectName")
        const projectLink = formData.get("projectLink")
        if (!projectName || !projectImage) {
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, { status: 401 })
        }
        const projectImages: any = await uploadToCloudinary(projectImage, "next-galleryImage");
        const projectImageUrl = projectImages.url

        if (!projectImageUrl) {
            return NextResponse.json({
                success: false,
                message: "image file not found"
            }, { status: 401 })
        }
        const projectData = await projectModel.create({
            projectName,
            projectImage: projectImageUrl,
            weblink: projectLink
        })
        if (projectData) {
            return NextResponse.json({
                success: true,
                message: "project upload successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong !Please try again",
            });
        }

    } catch (error) {
        console.log("error in upload projects", error);
        return NextResponse.json({
            success: false,
            message: "uploading error"
        }, { status: 500 })

    }
}