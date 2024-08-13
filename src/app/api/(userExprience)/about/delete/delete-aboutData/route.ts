import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";
import aboutModel from "@/models/about.model";


export async function DELETE() {
    await dbConnect();
    try {

        await aboutModel.deleteOne()

        return NextResponse.json({
            success: true,
            message: "deleted",
        }, { status: 200 })

    } catch (error) {
        console.log("error in delete aboutData", error);
        return NextResponse.json({
            success: false,
            message: "delete error"
        }, { status: 500 })

    }
}