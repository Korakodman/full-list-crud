import { NextResponse } from "next/server";


export async function GET() {
    const note = {
      id: Date.now(),
      namelist: "test",
      time: new Date().toLocaleString(),
      color: false,
    }
    return NextResponse.json(note,{ status: 200})
}