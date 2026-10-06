"use client";

import Image from "next/image";
import Header from "./components/Header";
import SideBarL from "./components/SideBarL";
import Content_Input from "./components/Content_Input";
import SideBarR_T from "./components/SideBarR_T";
import Content_D from "./components/Content_D";
import { useState } from "react";

export default function Home() {

  const [dsl, setDsl] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid grid-cols-[20%_50%_30%] grid-rows-[12%_88%_100%] h-screen bg-gray-100">
      <Header/>
      <SideBarL/>
      <Content_Input onDslChange={setDsl} onLoadingChange={setLoading} />
      <SideBarR_T  dsl={dsl} loading={loading} />
      <div className="col-span-3">
        <Content_D />
      </div>
    </div>
  );
}
