"use client";
import React from "react";
import { useState } from "react";
import Itemlist from "./Itemlist";
export default function Main() {
  // *  สร้าง list มาเป็นที่เก็บข้อมูล ไว้โหลดจาก database หรือ mockup(จำลองนั้นเอง) */
  const [list, setlist] = useState([]);
  // *เป็น state ไว้เก็บการเคลื่อนไวของ input ต้องสร้าง name:value ไว้ด้วยไม่งั้นมันจะหาไม่เจอว่าจะแสดงเป็นอะไร
  // ! เมื่อ มันหาไม่เจอจะขึ้นใน input หรือ console [object Object] แก้โดยใส่ ชื่อ state ของ object ตามด้วย เข้าถึงค่าภายในของมั้น เช่น
  // ! inputvalue.namelist
  const [inputvalue, setinputvalue] = useState({
    namelist: "",
    checked: false,
    time: new Date().toLocaleString(),
  });
  // * เป็นฟั่งชั่นเมื่อมีการเปลี่ยนแปลงก็จะเก็บ e หรือ event โดยสร้างตัวแปลเก็บชื่อ name,value เป็น object ที่ส่งมาตามทีี่ตั้งชื่อ เช่น
  // * เป็น name: "namelist"
  // * การใช้ prev เป็นการดึงค่าอันเก่ามาด้วย เมื่อมีการเปลี่ยนแปลงก็จะแทนที่ค่าตัวเก่า
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setinputvalue((prev) => ({ ...prev, [name]: value }));
    console.log([inputvalue]);
  };
  // * เมื่อมีการกด submit ของ form รับ event มาแล้วเรียกใช้ preventDefault() เพื่อให้หน้าเว็บโหลด
  // * จากนั้นดึงค่าจาก list อันเก่ามาด้วยแทนที่ prev เมื่อกดแล้วจะแทนที่ตัวเก่าด้วยตัวใหม่ของ inputvalue
  // * จากนั้นล้างค่าที่เป็น inputvalue ให้หมด
  const submitform = (e) => {
    try {
      e.preventDefault();
      setlist((prev) => [...prev, inputvalue]);
      setinputvalue({
        namelist: "",
        checkend: false,
        time: new Date().toLocaleString(),
      });
    } catch (error) {
      console.log(error);
    }
    console.log(list);
  };
  const checkbox = (e, index, checked) => {
    const check = e.target.checked;
    if (check) {
      console.log("checked");
      console.log(index);
      if (index == index) {
      } else {
        console.log("ผิด");
      }
    } else {
      console.log("unchecked");
    }
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
                onChange={handleonchange}
                value={inputvalue.namelist}
                name="namelist"
              />
              <button
                className=" p-2 bg-amber-200 rounded-md ml-2"
                type="submit"
              >
                Add
              </button>
            </form>
          </section>
          {/* <Itemlist list={list} checkend={checkend} setcheckend={setcheckend} /> */}
          <section className="grid grid-cols-1 gap-2 mt-2">
            {list.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center bg-cyan-500 p-2 rounded-2xl"
                >
                  <div className=" ml-2 flex  ">
                    <div className="mr-2 flex items-center">
                      <input
                        className=" w-4 h-4 rounded-md mr-2 checked:bg-amber-200"
                        type="checkbox"
                        onClick={(e) => checkbox(e, index + 1, item.checked)}
                      />
                      {index + 1}
                    </div>
                    <div key={item.id}>
                      <h1 className="text-lg"> {item.namelist}</h1>
                      <div className="">
                        <p className=" text-[12px] text-white ">{item.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="p-2 mr-4 bg-red-300 rounded-md">
                      delete
                    </button>
                    <button className="p-2 bg-blue-300 rounded-md">edit</button>
                  </div>
                </div>
              );
            })}
          </section>
        </header>
      </section>
    </main>
  );
}
