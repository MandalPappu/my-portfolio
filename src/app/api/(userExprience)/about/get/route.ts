import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import aboutModel from "@/models/about.model";
import { revalidatePath } from "next/cache";



export async function GET() {
    revalidatePath("/")
    await dbConnect();
    try {
        const aboutData = await aboutModel.findOne()
        
        if (aboutData) {
            return NextResponse.json({
                success: true,
                message: "data fetched successfully",
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