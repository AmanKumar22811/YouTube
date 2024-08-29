import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/appSlice";
const buttonList = [
  "All",
  "Love Babbar",
  "Data Structure",
  "Web Development",
  "Javascript",
  "Java",
  "Live",
  "Code Help",
  "Chai aur Code",
  "Music",
  "Songs",
  "Vlogs",
  "Trending",
  "Programming",
  "News",
  "Technology",
  "Cricket",
  "Comedy",
  "Thriller",
  "New to you",
  "Computer Programming",
  "Netlify",
  "Coding",
];

const ButtonList = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const videoByTag = (tag) => {
    if (active !== tag) {
      dispatch(setCategory(tag));
      setActive(tag);
    }
  };
  const open = useSelector((store) => store.app.open);
  return (
    <div
      className={`flex ${
        open ? "w-[80vw]" : "w-[88vw]"
      } overflow-x-scroll no-scrollbar my-3`}
    >
      {buttonList.map((buttonName, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => {
                videoByTag(buttonName);
              }}
              className={`${
                active === buttonName
                  ? "bg-slate-900 text-white dark:bg-red-600"
                  : "bg-gray-200"
              } w-fit font-medium mx-1 cursor-pointer px-3 py-2 rounded-lg`}
            >
              <span className="whitespace-nowrap">{buttonName}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ButtonList;
