import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import aboutModel from "@/models/about.model";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const Data = await req.json();
        const { aboutData, title } = Data;
        if (!aboutData) {
            return NextResponse.json({
                success: false,
                message: "about is required"
            }, { status: 401 })
        }

        const about = await aboutModel.create({
            aboutData,
            title
        })
        if (about) {
            return NextResponse.json({
                success: true,
                message: "project upload successfully",
                data: about
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong !Please try again",
            });
        }

    } catch (error) {
        console.log("error in upload aboutData", error);
        return NextResponse.json({
            success: false,
            message: "uploading error"
        }, { status: 500 })

    }
}