"use client";
import React from "react";
import { useState } from "react";
import Itemlist from "./Itemlist";
export default function Main() {
  const [list, setlist] = useState([]);
  const [input, setinput] = useState("");
  const [checkend, setcheckend] = useState(false);

  // สร้างฟังชั่น ชื่อ Addnote เมื่อกดปุ่ม button
  // จะทำการเพิ่มข้อมูลลง list state โดยใช้ ... ในการดึงข้อมูลตัวเก่ามาด้วยและเพิ่มต่อตามไป

  const Addnote = () => {
    if (!input) {
      alert("ใส่ข้อมูลด้วย");
    } else {
      setlist([...list, input]);
      setinput("");
    }
  };

  const InputValue = (e) => {
    setinput(e.target.value);
  };

  const submitform = (e) => {
    e.preventDefault();
    Addnote();
  };

  return (
    <main className=" p-2 bg-gray-400 w-full h-[90vh]">
      <section>
        <header>
          <h1 className="text-3xl">Code Note</h1>
          <section className=" flex">
            <form onSubmit={submitform}>
              <input
                className=" bg-white p-2 rounded-md "
                placeholder="Search"
                onChange={InputValue}
                value={input}
              />
              <button
                className=" p-2 bg-amber-200 rounded-md ml-2"
                type="submit"
              >
                Add
              </button>
            </form>
          </section>
          <Itemlist list={list} checkend={checkend} setcheckend={setcheckend} />
        </header>
      </section>
    </main>
  );
}
