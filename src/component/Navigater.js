import React from "react";

export default function Navigater({ First, second, third }) {
  return (
    <ul className=" flex text-lg w-[520px] justify-around">
      <li className="mr-6 hover:text-blue-500 duration-200 hover:bg-white border-2 border-blue-500 p-2 rounded-md">
        <a href="#">{First}</a>
      </li>
      <li className="mr-6 hover:text-blue-500  duration-200 hover:bg-white border-2 border-blue-500 p-2 rounded-md">
        <a href="#">{second}</a>
      </li>
      <li className="mr-10 hover:text-blue-500  duration-200  hover:bg-white border-2 border-blue-500 p-2  rounded-md">
        <a href="#">{third}</a>
      </li>
    </ul>
  );
}
