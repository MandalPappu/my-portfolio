import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import projectModel from "@/models/projects.model";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const {id} = await req.json()
        await projectModel.findByIdAndDelete({_id:id})

        return NextResponse.json({
            success: true,
            message: "deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete project", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}