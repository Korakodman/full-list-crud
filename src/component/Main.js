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
    id: Date.now(),
    namelist: "",
    checked: false,
    time: new Date().toLocaleString(),
    color: false,
  });
  const [Erorr, setErorr] = useState(false);
  // * เป็นฟั่งชั่นเมื่อมีการเปลี่ยนแปลงก็จะเก็บ e หรือ event โดยสร้างตัวแปลเก็บชื่อ name,value เป็น object ที่ส่งมาตามทีี่ตั้งชื่อ เช่น
  // * เป็น name: "namelist"
  // * การใช้ prev เป็นการดึงค่าอันเก่ามาด้วย เมื่อมีการเปลี่ยนแปลงก็จะแทนที่ค่าตัวเก่า
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setinputvalue((prev) => ({ ...prev, [name]: value }));
  };
  // * เมื่อมีการกด submit ของ form รับ event มาแล้วเรียกใช้ preventDefault() เพื่อให้หน้าเว็บโหลด
  // * จากนั้นดึงค่าจาก list อันเก่ามาด้วยแทนที่ prev เมื่อกดแล้วจะแทนที่ตัวเก่าด้วยตัวใหม่ของ inputvalue
  // * จากนั้นล้างค่าที่เป็น inputvalue ให้หมด
  const submitform = (e) => {
    if (inputvalue.namelist) {
      e.preventDefault();
      setlist((prev) => [...prev, inputvalue]);
      setinputvalue({
        id: Date.now(),
        namelist: "",
        checkend: false,
        time: new Date().toLocaleString(),
        color: false,
      });
      setErorr(false);
    } else {
      e.preventDefault();
      setErorr(true);
    }
  };
  // * แก้ไข้ให้มันเลือก checked ใน objectด้วย
  const [selectid, setselectid] = useState([]);
  const handleoncheckbox = (id) => {
    if (id) {
      setselectid((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };
  const handlecolorchecklsit = () => {
    const updatecolor = list.map((item) => {
      if (selectid[item.id]) {
        return { ...item, color: !item.color };
      }
      return item;
    });

    setlist(updatecolor);
    console.log(updatecolor);
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
              <div className="text-red-500 mt-2">
                {Erorr ? "ใส่ข้อมูลด้วยครับ" : ""}
              </div>
            </form>
          </section>
          {/* <Itemlist list={list} checkend={checkend} setcheckend={setcheckend} /> */}
          <section className="grid grid-cols-1 gap-2 mt-2">
            {list.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    item.color
                      ? "flex justify-between items-center bg-gray-500 p-2 rounded-2xl"
                      : "flex justify-between items-center bg-cyan-500 p-2 rounded-2xl"
                  }
                >
                  <div className=" ml-2 flex  ">
                    <div className="mr-2 flex items-center">
                      <input
                        className=" w-4 h-4 rounded-md mr-2 checked:bg-amber-200"
                        type="checkbox"
                        onChange={() => {
                          handleoncheckbox(item.id), handlecolorchecklsit();
                        }}
                        checked={selectid[item.id] || false}
                      />

                      {index + 1}
                    </div>
                    <div key={item.id}>
                      <h1
                        className={
                          item.color ? "text-lg  bg-red-400" : "text-lg "
                        }
                      >
                        {item.namelist}
                      </h1>
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
