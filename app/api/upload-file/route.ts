import cloudinary from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { file } = await req.json()
        const upload = await cloudinary.uploader.upload(file)
        console.log(upload)
        return new NextResponse(JSON.stringify(JSON.stringify(upload.url)))
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500
        })
    }
}