import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import visitorModel from "@/models/contact.model";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const {id} = await req.json()
        await visitorModel.findByIdAndDelete({_id:id})

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