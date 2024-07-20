import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import resumeModel from "@/models/resume.model";




export async function DELETE() {
    await dbConnect();
    try {
        await resumeModel.deleteOne()

        return NextResponse.json({
            success: true,
            message: "resume is deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete resume", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}