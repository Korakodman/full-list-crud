import React from "react";
import Header from "./Header";
import Navigater from "./Navigater";
export default function Navbar() {
  return (
    <nav className="text-white bg-black md:p-6 p-2 flex justify-between items-center border-2  border-black">
      <Header namelogo="Todo List Fullstack" />
     
      
    </nav>
  );
}
