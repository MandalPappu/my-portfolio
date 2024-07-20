import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import visitorModel from "@/models/contact.model";

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const visitorMessageItem = await req.json()
        await visitorModel.deleteOne(visitorMessageItem._id)

        return NextResponse.json({
            success: true,
            message: "deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete skill", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}