import React from "react";

export default function Header({ namelogo }) {
  return (
    <header className=" text-2xl font-bold hover:cursor-pointer">
      {namelogo}
    </header>
  );
}
