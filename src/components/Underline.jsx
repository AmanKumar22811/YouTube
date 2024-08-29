import React from "react";

const Underline = () => {
  return (
    <div>
      <div className={` ${open ? "w-[100%] " : "w-[50%]"} border`}></div>
    </div>
  );
};

export default Underline;
