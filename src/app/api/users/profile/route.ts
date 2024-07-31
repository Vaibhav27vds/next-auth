import User from "@/models/userModel";
import {connect} from "@/dbConnection/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}