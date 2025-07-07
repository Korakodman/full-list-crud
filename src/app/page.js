"use client";
import Navbar from "@/component/Navbar";
import Main from "@/component/Main";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Itemlist from "../component/Itemlist";
export default function Home() {
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
  // * โดยเข้าถึง color ถ้า checkend เป็นจริงให้เปลี่ยนตามค่า ถ้า checked ? "จริง" : "ไม่จริง"
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

  // * ฟั่งชั่นลบ รับ id เข้ามาแล้วทำการ เรียกใช้ ฟั่งชั้นเซ็ต setlist ดึงค่าต่างๆภายมา .filter โดย เม็ดธอดนี้ไว้กรองข้อมูลใน array
  // * โดยจะสร้าง array ใหม่กลับเข้าไปใน list โดยถ้า item เข้าถึง .id ไม่เท่ากันกับ id ก็สร้างใหม่
  const DeleteOption = (id) => {
    setlist((prev) => prev.filter((item) => item.id !== id));
  };
  // ? จะสร้างเป็น popup ขึ้นมาให้กรอกเพืื่อเปลี่ยนอย่างไง

  const EditOption = (id) => {
    console.log(id + " แก้ไข");
  };
  // * สร้างโจทย์สร้าง Dialog ขึ้นมาและสร้างฟั่งชั้นการกระทำต่างๆของมันไม่ว่าจะ เปิด ปิด คลิกข้างนอกแล้วปิด
  const modal = useRef();
  const OpenDialog = () => {
    modal.current.showModal();
  };
  const CloseDialoig = () => {
    modal.current.close();
  };
  const ClickOutside = (e) => {
    if (e.target === modal.current) {
      CloseDialoig();
    }
  };

  return (
    <>
      <Navbar />
      <main className=" p-2 bg-gray-400 w-full h-[90vh]">
        <section className=" ">
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
              OpenDialog={OpenDialog}
            />
          </header>
        </section>
        ;
      </main>
      <dialog
        ref={modal}
        className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
           w-[400px] p-4 bg-white rounded-md shadow-lg"
        onClick={(e) => ClickOutside(e)}
      >
        <div>
          <div>Dialog</div>
          <button onClick={CloseDialoig} className="bg-gray-300">
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
