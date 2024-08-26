import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import projectModel from "@/models/projects.model";
import uploadOnCloudinary from "@/helpers/cloudinary";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const projectName = formData.get("projectName") as string;
        const projectImage: FileList | null = formData.getAll("projectImage") as unknown as FileList;
        const projectLink = formData.get("projectLink");

        if (!projectName || projectImage?.length < 0) {
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, { status: 401 })
        } 
        

        const imgArray = []
        for (let img = 0; img < projectImage.length; img++) {
            const res: any = await uploadOnCloudinary(projectImage[img], "my-portfolio/myworkfolio-project-images")
            imgArray.push(res.url)
        }

        if (imgArray.length <= 0) {
            return NextResponse.json({
                success: false,
                message: "image file not found"
            }, { status: 401 })
        }
        const projectData = await projectModel.create({
            projectName: projectName,
            projectImages: imgArray,
            weblink: projectLink || ""
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