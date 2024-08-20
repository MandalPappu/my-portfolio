import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import skillModel from "@/models/skills.model";
import { revalidatePath } from "next/cache";

export async function GET() {
    revalidatePath("/")
    await dbConnect();
    try {
        const allSkills = await skillModel.find()
        
        if (allSkills) {
            return NextResponse.json({
                success: true,
                message: "all skills found successfully",
                allSkills
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong !Please try again",
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "project data not found"
        })
    }
}