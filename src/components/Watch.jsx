import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";

const Watch = () => {
  const [input, setInput] = useState("");
  const [singleVideo, setSingleVideo] = useState("");
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleVideo();
  }, []);
  const sendMessage = () => {
    dispatch(setMessage({ name: "You", message: input }));
    setInput("");
  };
  return (
    <div className="flex ml-4 w-[205%] mt-2">
      <div className="flex w-[88%]">
        <div>
          <iframe
            width="800"
            height="350"
            src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h1 className="font-bold mt-2 text-lg dark:text-white">
            {singleVideo?.snippet?.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-[35%] ">
              <div className="flex">
                <Avatar
                  src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                  size={35}
                  round={true}
                />
                <h1 className="font-bold ml-2 mt-1 dark:text-white">
                  {singleVideo?.snippet?.channelTitle}
                </h1>
              </div>
              <button className="px-4 py-1 font-medium bg-black text-white rounded-full dark:bg-red-700">
                Subscribe
              </button>
            </div>
            <div className="flex items-center w-[45%] justify-between mt-2 mr-3">
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <AiOutlineLike size="20px" className="mr-5" />
                <AiOutlineDislike size="20px" />
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <PiShareFatLight className="mr-2 size-[20px]" />
                <span>Share</span>
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <GoDownload />
                <span>Download</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] border border-gray-300 ml-8 rounded-lg h-fit p-4">
          <div className="flex justify-between items-center dark:text-white">
            <h1>Top Chat</h1>
            <BsThreeDotsVertical />
          </div>
          <div className="overflow-y-auto h-[28rem] flex flex-col-reverse">
            <LiveChat />
          </div>
          <div className="flex items-center justify-between border-t p-2">
            <div className="flex items-center w-[90%] gap-0.5">
              <div>
                <Avatar
                  src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                  size={35}
                  round={true}
                />
              </div>
              <input
                className="border-b border-gray-600 outline-none rounded-xl"
                type="text"
                value={input}
                placeholder="Send Message..."
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="bg-gray-200 cursor-pointer p-2 rounded-full dark:bg-red-500 dark:text-white">
                <LuSendHorizonal onClick={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
