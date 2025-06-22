import React from "react";

export default function Itemlist({ list, checkend, setcheckend }) {
  // รับทั้ง event กับ ตัวแปล(เลขindex) แล้วไปทำอย่างอื่นต่อ
  const checkbox = (e, index) => {
    const check = e.target.checked;
    setcheckend(check);
    if (check) {
      console.log("checked");
      console.log(index);
    } else {
      console.log("unchecked");
    }
  };
  return (
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
                  onClick={(e) => checkbox(e, index + 1)}
                />
                {index + 1}
              </div>
              <h1> {item}</h1>
            </div>
            <div className="p-2">
              <button className="p-2 mr-4 bg-red-300 rounded-md">delete</button>
              <button className="p-2 bg-blue-300 rounded-md">edit</button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
