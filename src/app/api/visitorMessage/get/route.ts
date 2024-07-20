import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import visitorModel from "@/models/contact.model";


export async function GET() {
    await dbConnect();
    try {
        const allVisitorMessage = await visitorModel.find({})
        if (allVisitorMessage) {
            return NextResponse.json({
                success: true,
                message: "message found successfully",
                data: allVisitorMessage
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Please try again !",
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "visitor message not found"
        })
    }
}