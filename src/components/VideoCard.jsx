import React from "react";
import { useState, useEffect } from "react";
import Avatar from "react-avatar";
import axios from "axios";

const VideoCard = ({ item }) => {
  const [ytIcon, setYtIcon] = useState("");
  const getYoutubeChannelName = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
          item.snippet.channelId
        }&key=${import.meta.env.VITE_API_KEY}`
      );
      setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getYoutubeChannelName();
  }, []);

  return (
    <div className=" w-94 cursor-pointer m-1 my-2">
      <img
        className=" rounded-xl w-full"
        src={item.snippet.thumbnails.high.url}
        alt=""
      />
      <div>
        <div className="flex mt-2">
          <Avatar src={ytIcon} size={50} round={true} />
          <div className="ml-2">
            <h1 className="font-bold text-sm dark:text-white">
              {item.snippet.title}
            </h1>
            <p className="text-sm text-gray-500">{item.snippet.channelTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
