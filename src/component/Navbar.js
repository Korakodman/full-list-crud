import React from "react";
import Header from "./Header";
import Navigater from "./Navigater";
export default function Navbar() {
  return (
    <nav className="text-white bg-black p-6 flex justify-between items-center border-2  border-black">
      <Header namelogo="DevNote" />
      <Navigater First="Code" second="Test" third="Test" />
    </nav>
  );
}
