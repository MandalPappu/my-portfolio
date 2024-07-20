import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import projectModel from "@/models/projects.model";


export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const projectItem = await req.json()
        await projectModel.deleteOne(projectItem._id)

        return NextResponse.json({
            success: true,
            message: "deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete skill", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}