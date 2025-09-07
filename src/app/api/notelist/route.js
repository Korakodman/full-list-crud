import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/app/models/Note";
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

export async function GET() {
  await connectDB()
    try {
      const note = await Note.find({})
         return NextResponse.json(note,{ status: 200})
    } catch (error) {
      return NextResponse.json(
        {error: error.message,},
        {status:500 }
      )
    }
 
}
export async function POST(req) {
   await connectDB()
   try {
    const body = await req.json();
    console.log(body,"ได้ข้อมูล")
    const newNote = new Note(body)
    await newNote.save()
    return NextResponse.json(newNote,{status:201})
   } catch (error) {
    console.error(error)
   }
   
}
export async function DELETE(req,{params}) {
 await connectDB()
 try {
    // const SelectDelete = await params.id
    const ids = await req.json()
    console.log("ID ที่จะลบ", ids)
    // if(!SelectDelete){
    //           return NextResponse.json({message : "Note Not Found"},{ status:404 })
    //         }
    return NextResponse.json({message : "Delete Succese"},{status:200})
 } catch (error) {
    if(error){
      console.log("error" , error)
       return NextResponse.json({message : "Error "},{ status : 400})
    }
 }
}