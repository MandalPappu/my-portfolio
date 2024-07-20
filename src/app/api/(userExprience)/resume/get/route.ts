import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import resumeModel from "@/models/resume.model";

export async function GET() {
    await dbConnect();
    try {
        const resume = await resumeModel.find()

        return NextResponse.json({
            data:resume
        }, { status: 200 })

    } catch (error) {
        console.log("error in fetch resume", error);
        return NextResponse.json({
            success: false,
            message: "resume fetch error"
        }, { status: 500 })

    }
}