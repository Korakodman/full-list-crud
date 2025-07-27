import { NextResponse } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
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
  
    
    const {name} = await req.json()
    const newNote = { id: Date.now() , name}
    console.log(newNote,"ได้ข้อมูล")
    return NextResponse.json(newNote,{status:201, headers :corsHeaders})
  
   
}