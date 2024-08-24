import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import skillModel from "@/models/skills.model";
import { deleteOnCloudinary } from "@/helpers/cloudinary";


export async function POST(req:NextRequest) {
    await dbConnect();
    try {
        const {id} =await req.json()
        const res = await skillModel.findByIdAndDelete({ _id: id }) 
        const skillImage = res.skillImage;
        const imgUrl = skillImage.split("/");
        const img = imgUrl.pop();
        const imgName = img.split(".")[0]
        const imgFile = `${"my-portfolio/myworkfolio-skill-images"}/${imgName}`
        
        const imageRes = await deleteOnCloudinary(imgFile.toString());     
        if (res._id && imageRes.result === "ok") {
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
        console.log("error in delete skill", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}