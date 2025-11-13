import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/app/models/Note";
import { ObjectId } from "mongodb";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// -DELETE- //
export async function DELETE(req,{params}) {
    // - เชื่อมต่อฐานข้อมูลโดยส่ง env ไปตรงๆ - //
    await connectDB(process.env.URLMONGODB)
    try {
          // - รับพารามิเตอร์เข้าถึง id อาจจะใช้ consolg.log เรียกดูก่อนก็ได้ - //
      const {id} = await params
        //  console.log("params id =>", params.id)

        const deletedUser = await Note.findByIdAndDelete(new ObjectId(id));

        if(!deletedUser){
          return NextResponse.json({message : "Note Not Found"},{ status:404 ,headers:corsHeaders })
        }

      return NextResponse.json({message : "Delete Succese"},{status:200,headers:corsHeaders})
    } catch (error) {

        if(error){
          console.error("error",error)
          return NextResponse.json({message : "Error "},{ status : 400,headers:corsHeaders})
         
        }
    }
 }
 // -UPDATE NOTE- //

 export async function PUT(req,{params}) {
  await connectDB(process.env.URLMONGODB)
  try {
    const {id} = await params

    // -รับค่าที่ส่งมาจาก form หน้าบ้าน- //

    const body = await req.json()

    // -ใช้ log ดูข้อมูลก่อนเพื่อเช็คค่า- //
  //  console.log("ข้อมูลที่จะอัพเดตคือ " , body)

   if(!body){
          return NextResponse.json({message : "Note Not Found"},{ status:404 ,headers:corsHeaders })
        }
        // -ตรง(id) ถ้าเป็น (body) ไม่ได้ ก็ {body} นะ อย่าลืม new:true เพื่ออัพเดตฐานข้อมูลใหม่- //
    const EditeNote = await Note.findByIdAndUpdate(new ObjectId(id),(body),{new:true})
   
    return NextResponse.json({message : "Edit Succese",Note:EditeNote})
  } catch (error) {
   if(error){
          console.error("error",error)
          return NextResponse.json({message : "Error "},{ status : 400 ,headers:corsHeaders})
         
        }
  }
 }