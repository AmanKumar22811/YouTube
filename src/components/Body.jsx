import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <div className="flex mt-16">
        <Sidebar />
        <Outlet/>
      </div>
    </div>
  );
};

export default Body;
