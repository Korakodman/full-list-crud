import React, { useRef } from "react";

export default function Itemlist({
  list,
  handleoncheckbox,
  DeleteOption,
  EditOption,
  OpenDialog,
}) {
  return (
    <div>
      {" "}
      <section className="grid grid-cols-1 gap-2 mt-2">
        {list.map((item, index) => {
          return (
            <div
              key={item.id}
              className={
                item.color
                  ? "bg-blue-400 flex justify-between  duration-200 items-center p-2"
                  : "bg-gray-500 flex justify-between  duration-500 items-center p-2"
              }
            >
              <div className=" ml-2 flex  ">
                <div className="mr-2 flex items-center">
                  <input
                    className=" w-4 h-4 rounded-md mr-2 checked:bg-amber-200"
                    type="checkbox"
                    onChange={(e) => {
                      handleoncheckbox(e, item.id);
                    }}
                  />

                  {index + 1}
                </div>
                <div key={item.id}>
                  <h1 style={{ backgroundColor: item.color }}>
                    {item.namelist}
                  </h1>
                  <div className="">
                    <p className=" text-[12px] text-white ">{item.time}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button
                  type="button"
                  className="p-2 mr-4 bg-blue-300 rounded-md hover:bg-blue-500 duration-200"
                  onClick={() => OpenDialog(item.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="p-2 mr-4 bg-red-300 rounded-md hover:bg-red-500 duration-200"
                  onClick={() => DeleteOption(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
      ;
    </div>
  );
}
