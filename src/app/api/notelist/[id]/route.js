import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/app/models/Note";
import { ObjectId } from "mongodb";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function DELETE(req,context) {
    await connectDB()
    try {
        const {params} =  context
        const id = await params
        const deletedUser = await Note.findByIdAndDelete(new ObjectId(id));
        if(!deletedUser){
          return NextResponse.json({message : "Note Not Found"},{ status:404 ,headers: corsHeaders})
        }
      return NextResponse.json({message : "Delete Succese"},{status:200,headers: corsHeaders})
    } catch (error) {
        if(error){
          console.error("error",error)
          return NextResponse.json({message : "Error "},{ status : 400,headers: corsHeaders })
         
        }
    }
 }