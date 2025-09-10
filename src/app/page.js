"use client";
import Navbar from "@/component/Navbar";
import Main from "@/component/Main";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Itemlist from "../component/Itemlist";
import '@ant-design/v5-patch-for-react-19';
export default function Home() {

  ;
  return (
    <>
      <Navbar />
     <Main/>
    </>
  );

}