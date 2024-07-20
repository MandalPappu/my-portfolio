import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import aboutModel from "@/models/about.model";

export async function GET() {
    await dbConnect();
    try {
        const aboutData = await aboutModel.find({})
        if (aboutData) {
            return NextResponse.json({
                success: true,
                message: "project upload successfully",
                data: aboutData
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
            message: "about data not found"
        })
    }
}