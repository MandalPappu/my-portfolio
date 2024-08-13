import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import projectModel from "@/models/projects.model";

export async function GET() {
    await dbConnect();
    try {
        const allProjects = await projectModel.find({}) 
        if (allProjects) {
            return NextResponse.json({
                success: true,
                message: "project fetched successfully",
                allProjects
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
            message:"project data not found"
        })
    }
}