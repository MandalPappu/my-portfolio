import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConfig";

export async function DELETE() {
    await dbConnect();
    try {
        const res = NextResponse.json({
            success: true,
            message: "User Logout successfully"
        }, { status: 200 })
        res.cookies.delete("token")
        return res;
    } catch (error) {
        console.log("error in logout", error);
        return NextResponse.json({
            success: false,
            message: "logout failed"
        }, { status: 500 })
    }
}