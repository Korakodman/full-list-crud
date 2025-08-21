import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/app/models/Note";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  await connectDB()
    try {
      const note = await Note.find({})
         return NextResponse.json(note,{ status: 200,headers:corsHeaders})
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      },{
        status:500,headers:corsHeaders
      })
    }
 
}
export async function POST(req) {
   await connectDB()
   try {
    const body = await req.json();
    console.log(body,"ได้ข้อมูล")
    const newNote = new Note(body)
    await newNote.save()
    return NextResponse.json(newNote,{status:201, headers :corsHeaders})
   } catch (error) {
    console.error(error)
   }
   
}