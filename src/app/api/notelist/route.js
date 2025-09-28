import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/app/models/Note";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// - API GET - // 
// - ดึงข้อมูลทั้งหมดในฐานข้อมูล - //
export async function GET() {
  await connectDB(process.env.URLMONGODB)
    try {
      // - รอ database ส่งข้อมูลกลับมา - //
      const note = await Note.find({})
         return NextResponse.json(note,{ status: 200, headers:corsHeaders})
    } catch (error) {
      return NextResponse.json(
        {error: error.message,},
        {status:500 }
      )
    }
 
}
// - API POST - //
// - สร้างข้อมูลใหม่ของ Note - //
export async function POST(req) {
   // - เชื่อมต่อฐานข้อมูลโดยส่ง env ไปตรงๆ - //
   await connectDB(process.env.URLMONGODB)

   try {
    const body = await req.json();
    // console.log(body,"ได้ข้อมูล")
    const newNote = new Note(body)
    await newNote.save()
    return NextResponse.json(newNote,{status:201 , headers:corsHeaders})
   } catch (error) {
    console.error(error)
   }
   
}
// - API DELETE - //
// - ลบข้อมูลตามที่ req ส่งมาจาก body(form api) โดยรับข้อมูลมาเป็น id - //
export async function DELETE(req) {
 await connectDB(process.env.URLMONGODB)
 try {
    const { ids} = await req.json()
    // console.log("ID ที่จะลบ", ids)
    await Note.deleteMany({ _id: { $in: ids } });
    if(!ids || ids.length === 0){
              return NextResponse.json({message : "Note Not Found"},{ status:404  ,headers:corsHeaders })
            }
    
     return new Response(JSON.stringify({ success: true }));
 } catch (error) {
    if(error){
      console.log("error" , error)
       return NextResponse.json({message : "Error "},{ status : 400 , headers:corsHeaders})
    }
 }
}