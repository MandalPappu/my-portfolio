import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import resumeModel from "@/models/resume.model";
import { revalidatePath } from "next/cache";

export async function GET() {
    revalidatePath("/")
    await dbConnect();
    try {
        const resume = await resumeModel.findOne()
        
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