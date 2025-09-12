import React, { useRef } from "react";
import { EditOutlined ,DeleteOutlined} from "@ant-design/icons";
import { Checkbox } from "antd";
export default function Itemlist({
  list,
  handleoncheckbox,
  DeleteOption,
  EditOption,
  OpenDialog,
  setOptionDiaglog,
}) {

  const stylecheckbox ={
   color: "#FFE797"
  }
  return (
    <div>
      {" "}
      <section className="grid grid-cols-1 gap-2 mt-2">
        {list.map((item, index) => {
          return (
            <div
              key={index +1}
              className={
                item.color
                  ? "bg-[#B45253] flex justify-between  duration-200 items-center p-2"
                  : "bg-gray-500 flex justify-between  duration-500 items-center p-2"
              }
            >
              <div className=" ml-2 flex  ">
                <div className="mr-2 flex items-center">
                  <Checkbox
              style={{ accentColor: "#FCB53B",  }}
                    type="checkbox"
                    onChange={(e) => {
                      handleoncheckbox(e, item._id);
                    }}
                    checked= {item.color || false}
                  />
             
                  <div className="ml-2">{index + 1}</div>
                </div>
                <div key={item._id} >
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
                  className="p-2 px-4 mr-4 bg-blue-300 rounded-md hover:bg-blue-500 duration-200"
                  onClick={() => {
                    OpenDialog(false, item._id,item.namelist);
                  }}
                >
                  <EditOutlined />
                </button>
                <button
                  type="button"
                  className="p-2 px-4 mr-4 bg-red-300 rounded-md hover:bg-red-500 duration-200"
                  onClick={() => {
                    OpenDialog(true, item._id);
                  }}
                >
                 <DeleteOutlined />
                </button>
              </div>
            </div>
          )
        })}
      </section>
      
    </div>
  );
}
