import React from "react";

export default function Header({ namelogo }) {
  return (
    <header className=" md:text-2xl text-xl ml-2 mr-2 font-bold hover:cursor-pointer">
      {namelogo}
    </header>
  );
}
