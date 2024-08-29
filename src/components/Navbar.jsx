import React, { useEffect, useState } from "react";
import { CiSearch, CiVideoOn } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Avatar from "react-avatar";
import DarkMode from "./DarkMode";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchSuggestion,
  toggleSidebar,
} from "../utils/appSlice";
import axios from "axios";
import { SEARCH_SUGGESTIONS_API } from "../constants/youtube";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const logoSrc = isDarkMode
    ? " https://news-cdn.softpedia.com/images/news2/youtube-is-finally-getting-a-dark-mode-rolling-out-soon-to-ios-and-android-520209-2.jpg"
    : "https://es.logodownload.org/wp-content/uploads/2018/09/youtube-logo-81-1024x228.png";

  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const { searchSuggestion } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchVideo();
    }
  };
  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };
  const showSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
      // console.log(res.data[1]);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };
  const openSuggestion = () => {
    setSuggestion(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      showSuggestion();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white dark:bg-black  dark:text-white ">
      <div className="flex w-[96%] py-3 justify-between items-center">
        <div className="flex items-center">
          <GiHamburgerMenu
            className="size-[25px] hover:cursor-pointer"
            onClick={toggleHandler}
          />
          <img className="w-[115px] px-4 " src={logoSrc} alt="YouTube Logo" />
          <div>
            <DarkMode onToggle={handleDarkModeToggle} />
          </div>
        </div>
        <div className="flex w-[40%] items-center">
          <div className="flex w-[100%]  ">
            <input
              type="text"
              onFocus={openSuggestion}
              className="w-full outline-none  px-4 py-2 border-2 border-gray-400 rounded-l-full dark:border-red-600 dark:bg-transparent"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <button
              onClick={searchVideo}
              className="py-2 px-4 border-2 border-gray-400 rounded-r-full dark:border-red-600 "
            >
              <CiSearch className="size-[24px]" />
            </button>
          </div>
          {suggestion && searchSuggestion.length !== 0 && (
            <div className="absolute top-3 z-50 w-[30%] py-5 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
              <ul>
                {searchSuggestion.map((text, index) => {
                  return (
                    <div
                      key={index}
                      className="flex px-4 py-1 hover:bg-gray-100"
                    >
                      <CiSearch className="size-6 pt-1  dark:text-gray-900" />
                      <li
                        onClick={searchVideo}
                        className="px-2  cursor-pointer text-md font-medium dark:text-gray-900 "
                      >
                        {text}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex w-[10%] items-center justify-between ">
          <IoIosNotificationsOutline className="size-[24px] cursor-pointer " />
          <CiVideoOn className="size-[24px] cursor-pointer " />

          <Avatar
            src="http://images1.wikia.nocookie.net/__cb20130201231636/caracteres/es/images/f/fb/Goku_SSJ.png"
            size={35}
            round={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
