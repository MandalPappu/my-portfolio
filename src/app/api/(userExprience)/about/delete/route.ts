import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import aboutModel from "@/models/about.model";


export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const aboutData = await req.json()
        await aboutModel.deleteOne(aboutData._id)

        return NextResponse.json({
            success: true,
            message: "deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete aboutData", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}