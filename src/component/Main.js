"use client";
import React, { useEffect, useRef } from "react";
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
        time: new Date().toLocaleString(),
        color: false,
      });

      setErorr(false);
    } else {
      e.preventDefault();
      setErorr(true);
    }
  };
  // ! ปัญหาที่เจอคือไม่รู้วิธีใช้ .map ที่ครบถ้วน
  // ? จงไปหาวิธัใช้มาให้ครบ
  // * เมื่อมีการเปลี่ยนแปลงจะเรียกใช้ handleoncheckbox และสร้างตัวแปรเก็บ ค่า check
  // * หลังจากนั้นสร้างตัวแปร เมื่อมีการเปลี่ยนแปลง
  // * ทำการ map data หรือ list หรือแสดงแต่ละตัวออกมาเก็บไว้ใน updatedList
  // * โดย ถ้า item.id ของ item(ตัวแทนของ list) ตรงกับ id ที่ส่งเข้ามาให้เปลี่ยนเฉพาะตัวนั้นที่ตรงกัน
  // * โดยเข้าถึง color ถ้า checkend เป็นจริงให้เปลี่ยนตามค่า
  const handleoncheckbox = (e, id) => {
    const checked = e.target.checked;
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          color: checked ? true : false,
        };
      }
      return item;
    });

    setlist(updatedList);
  };

  const DeleteOption = (id) => {
    console.log(id + " ลบ");
  };
  const EditOption = (id) => {
    console.log(id + " แก้ไข");
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
                onChange={(e) => handleonchange(e, list)}
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
          <Itemlist
            list={list}
            handleoncheckbox={handleoncheckbox}
            DeleteOption={DeleteOption}
            EditOption={EditOption}
          />
          <section className="grid grid-cols-1 gap-2 mt-2"></section>
        </header>
      </section>
    </main>
  );
}
