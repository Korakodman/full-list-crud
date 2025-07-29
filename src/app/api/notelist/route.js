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
    const note = [{
      id: Date.now(),
      namelist: "Korakod",
      time: new Date().toLocaleString(),
      color: false,
    },
  {
      id: Date.now(),
      namelist: "Sahapham",
      time: new Date().toLocaleString(),
      color: false,
    },
  {
      id: Date.now(),
      namelist: "patson",
      time: new Date().toLocaleString(),
      color: false,
    }]
    return NextResponse.json(note,{ status: 200})
}
export async function POST(req) {
  
    
   try {
    const {name} = await req.json()
    console.log(name,"ได้ข้อมูล")
    const newNote = new Note({name})
    await newNote.save()
    return NextResponse.json(newNote,{status:201, headers :corsHeaders})
   } catch (error) {
    console.error("error",error)
   }
   
}