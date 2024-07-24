import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import aboutModel from "@/models/about.model";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const Data = await req.json();
        const { aboutData } = Data;
        const about = await aboutModel.create({
            aboutData    
        })
        
        if (!about) {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong !Please try again",
            },{status:401});
        }
        return NextResponse.json({
            success: true,
            message: "About data added successfully",
            },{status:200});

    } catch (error) {
        console.log("error in upload aboutData", error);
        return NextResponse.json({
            success: false,
            message: "uploading error"
        }, { status: 500 })

    }
}