"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Itemlist from "./Itemlist";
import { Button, message, Space } from 'antd';
export default function Main() {
const URLMONGODB = process.env.URLMONGODB
    // *  สร้าง list มาเป็นที่เก็บข้อมูล ไว้โหลดจาก database หรือ mockup(จำลองนั้นเอง) */
  
    const [list, setlist] = useState([]);
    const [originalList,SetoriginalList] = useState([])
   
    // *เป็น state ไว้เก็บการเคลื่อนไวของ input ต้องสร้าง name:value ไว้ด้วยไม่งั้นมันจะหาไม่เจอว่าจะแสดงเป็นอะไร
    // ! เมื่อ มันหาไม่เจอจะขึ้นใน input หรือ console [object Object] แก้โดยใส่ ชื่อ state ของ object ตามด้วย เข้าถึงค่าภายในของมั้น เช่น
    // ! inputvalue.namelist
    const [inputvalue, setinputvalue] = useState({
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
  
    async function submitform  (e)  {
      if (inputvalue.namelist) {
        e.preventDefault();
        setlist((prev) => [...prev, inputvalue]);
        SetoriginalList((prev) => [...prev, inputvalue])
        setinputvalue({
          namelist: "",
          time: new Date().toLocaleString(),
          color: false,
        });
     try {
       const respone = await fetch(`/api/notelist`,{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body: JSON.stringify(inputvalue)
      })
     } catch (error) {
      console.log(error)
     }
        setErorr(false);
      } 
      
      
      else {
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
        if (item._id === _id) {
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
      setlist((prev) => prev.filter((item) => item._id !== _id));
      SetoriginalList((prev) => prev.filter((item) => item._id !== _id));
      success()
    };
    // * ฟั่งชั่นแก้ไขข้อมูล โดยรับ id เข้ามาแล้วทำการ map list ออกมาใหม่
    // * โดยจะทำการเปรียบเทียบ item.id กับ id ที่ส่งเข้ามา
    // * ถ้าเท่ากันจะทำการเปลี่ยนแปลงค่า namelist ของ item นั้นๆ
    // * โดยจะใช้ SelectNote.namelist ที่เก็บค่าจาก input ใน dialog
    // * สุดท้ายจะทำการ setlist ด้วย updatedList ที่ได้จากการ map ใหม่
    // * ทำให้ข้อมูลใน list ถูกอัพเดตตามที่ต้องการ
    // * โดยจะไม่ลบข้อมูลเดิมออกไป แต่จะเปลี่ยนแปลงข้อมูลที่ต้องการแก้ไขเท่านั้น
  
    const EditOption = (id) => {
     const updateList = list.map((item) => {
          if(item._id === _id){
            return{
              ...item,
              namelist: SelectNote.namelist,
              time: new Date().toLocaleString()
            }
          }
          return item
        })
        setlist(updateList)
        SetoriginalList(updateList)
        Editsuccess()
    };
      const [messageApi, contextHolder] = message.useMessage();

      const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Delete Success',
    });
  };
 const Editsuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Edit Success',
    });
  }
    // * สร้าง Dialog ขึ้นมาและสร้างฟั่งชั้นการกระทำต่างๆของมันไม่ว่าจะ เปิด ปิด คลิกข้างนอกแล้วปิด
    const [OptionDiaglog, setOptionDiaglog] = useState();
    const [SelectNote, setSelectNote] = useState({});
    const modal = useRef();
    const OpenDialog = (IsDelete, id,namelist) => {
      if (IsDelete) {
        // * ลบข้อมูลถ้าเป็นจริง
        modal.current.showModal();
        setOptionDiaglog(IsDelete);
        setSelectNote(id);
      } else {
        // * แก้ไขข้อมูล
        const note = { namelist, id };
        modal.current.showModal();
        setOptionDiaglog(IsDelete);
        setSelectNote(note);
      
      }

      // * เป็นฟั่งชั่นเปิด ปิด Dialog และ ฟอร็ม Dialog
    };
    const CloseDialoig = () => {
      modal.current.close();
    };
    const ClickOutside = (e) => {
      if (e.target === modal.current) {
        CloseDialoig();
      }
    };
    const FormDialog = (e) => {
      e.preventDefault();
      if (OptionDiaglog) {
        // * ลบข้อมูลถ้าเป็นจริง
        DeleteOption(SelectNote);
        CloseDialoig();
       
      } else {
        // * แก้ไขข้อมูล
        EditOption(SelectNote.id);
        CloseDialoig();
      }
    }

    // * สร้างฟั่งชั่น handleonchangeDialog เพื่อเปลี่ยนแปลงค่าใน input ของ dialog
    // * โดยจะรับ e หรือ event เข้ามาแล้วทำการ setSelectNote โดยใช้ prev เพื่อดึงค่าก่อนหน้าออกมา
    // * แล้วเปลี่ยนแค่าของ SelectNote ให้เป็นค่าใหม่ที่ได้จาก e.target.value
    // * โดย SelectNote จะเก็บค่า id และ namelist ที่จะใช้ในการแก้ไขข้อมูลใน dialog

const handleonchangeDialog = (e) =>{
      
      setSelectNote((prev) => ({ ...prev, namelist: e.target.value }));
    }

const [SearchInput, setSearchInput] = useState("")
const handleonSearch = (e) =>{
  const input = e.target.value
   setSearchInput(input)
if(input){
   const updateList = list.filter(item=>
    item.namelist.toLowerCase().includes(SearchInput.toLowerCase())
   )  
   setlist(updateList)
  
}else{
 setlist(originalList)
}
}
  return  ( 
   <main className=" p-2 bg-gray-400 w-full h-[90vh]">
          <section className=" ">
            <div>
              <h1 className="text-3xl">Code Note</h1>
              <section className=" flex">
                <form onSubmit={submitform}>
                  <input
                    className=" bg-white p-2 rounded-md "
                    placeholder="Add Text"
                    onChange={(e) => handleonchange(e)}
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
                <div>
                  <input type="text" placeholder="Search" className="bg-white p-2 rounded-md ml-2" value={SearchInput}
                  onChange={(e)=>handleonSearch(e)}/>
                  
                </div>
              </section>
            </div>
            <div> 
              <Itemlist
                list={list}
                handleoncheckbox={handleoncheckbox}
                DeleteOption={DeleteOption}
                EditOption={EditOption}
                OpenDialog={OpenDialog}
                setOptionDiaglog={setOptionDiaglog}
              /></div>
                    {contextHolder}
          </section>
          <dialog
          ref={modal}
          className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             w-[400px] p-4 bg-white rounded-md shadow-lg"
          onClick={(e) => ClickOutside(e)}
        >
          <div>
            <div>{OptionDiaglog ? "Do You Want To Delete?" : "Edit New"}</div>
            <div className="flex justify-between">
              <form onSubmit={(e) => FormDialog(e)}>
                 <div className="flex justify-between  w-[300px]">
                {OptionDiaglog ? "" :   
                <input onChange={(e) => handleonchangeDialog(e)} className=" bg-gray-300 p-2 rounded-xl 2" 
                value={SelectNote.namelist || ""}
                name="namelist"/>}
                <button className={OptionDiaglog ? "btn-Delete" : "btn-Edit"}>
                  {OptionDiaglog ? "Delete" : "Edits"}
                </button>
                 </div>
              </form>
              <button onClick={CloseDialoig} className="bg-gray-300 p-2">
                Close
              </button>
            </div>
          </div>
        </dialog>
        </main>
        
  );
    
  }