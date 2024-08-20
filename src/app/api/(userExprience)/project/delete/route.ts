import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import projectModel from "@/models/projects.model";
import { projectFolder } from "../add/route";
import { deleteOnCloudinary } from "@/helpers/cloudinary";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const {id} = await req.json()
        const res = await projectModel.findByIdAndDelete({ _id: id });
        const projectImages = res.projectImages;
        console.log("projectImg: ", projectImages);
        const imgFile = []
        for (let i = 0; i < projectImages.length; i++) {
            const projectImg = projectImages[i].split("/")
            const img = projectImg.pop();
            const imgName = img.split(".")[0]
            imgFile.push(`${projectFolder}/${imgName}`);
        };
        console.log(imgFile);
        const deleteImageRes = [];
        for (let i = 0; i < imgFile.length; i++) {
            const deleteRes = await deleteOnCloudinary(imgFile[i].toString());
            deleteImageRes.push(deleteRes)
        }
        console.log(deleteImageRes);
        
        if (res._id && deleteImageRes[0].result === "ok") {
            return NextResponse.json({
                success: true,
                message: "deleted",
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success: false,
                message: "error",
            }, { status: 401 })
        }

    } catch (error) {
        console.log("error in delete project", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}