import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import visitorModel from "@/models/contact.model";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const visitorName = formData.get("visitorName")
        const visitorEmail = formData.get("visitorEmail")
        const visitorMessage = formData.get("visitorMessage")
        if (!visitorName || !visitorEmail || !visitorMessage) {
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, { status: 401 })
        }
        const visitorWords =  await visitorModel.create({
            visitorName,
            visitorEmail,
            visitorMessage
        })
        if (visitorWords) {
            return NextResponse.json({
                success: true,
                message: "message send successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong !Please try again",
            });
        }

    } catch (error) {
        console.log("error in sending messages", error);
        return NextResponse.json({
            success: false,
            message: "message sending error"
        }, { status: 500 })

    }
}