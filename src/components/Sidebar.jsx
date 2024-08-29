import React from "react";
import Avatar from "react-avatar";
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdOutlineSubscriptions,
  MdHistory,
  MdOutlinePlaylistPlay,
  MdOutlineWatchLater,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import Underline from "./Underline";

const sidebarItem1 = [
  {
    icons: <CiHome size="24px" />,
    title: "Home",
  },
  {
    icons: <SiYoutubeshorts size="24px" />,
    title: "Short",
  },
  {
    icons: <MdOutlineSubscriptions size="24px" />,
    title: "Subscription",
  },
];
const sidebarItem2 = [
  {
    icons: <CgProfile size="24px" />,
    title: "Your Channel",
  },
  {
    icons: <MdHistory size="24px" />,
    title: "History",
  },
  {
    icons: <MdOutlinePlaylistPlay size="24px" />,
    title: "Playlists",
  },
  {
    icons: <GoVideo size="24px" />,
    title: "Your Videos",
  },
  {
    icons: <MdOutlineWatchLater size="24px" />,
    title: "Watch Later",
  },
  {
    icons: <AiFillLike size="24px" />,
    title: "Liked Videos",
  },
];
const subscriber = [
  {
    src: "https://2.bp.blogspot.com/_-kBbwqwsNbc/TUnbnIPn2oI/AAAAAAAAACY/0mQ40A2ANr4/s1600/uchiha%2Bitachi.jpg",
    name: "Itachi",
  },
  {
    src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8fd9d3a8-b417-4de9-a630-cb03bd4638e2/dfi7b23-57c5175c-0898-401a-b217-3846dd72f57a.jpg/v1/fill/w_894,h_894,q_70,strp/gohan_beast_db_legends__render__by_jamesdbl_dfi7b23-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzhmZDlkM2E4LWI0MTctNGRlOS1hNjMwLWNiMDNiZDQ2MzhlMlwvZGZpN2IyMy01N2M1MTc1Yy0wODk4LTQwMWEtYjIxNy0zODQ2ZGQ3MmY1N2EuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.x5AHHClSBsUiR0tlmGQjKXO6x30t7w2rYXzIySTWXAE",
    name: "Gohan",
  },
  {
    src: "https://www.wallpaperflare.com/static/45/459/672/super-saiyan-blue-vegeta-sayan-dragon-ball-super-wallpaper.jpg",
    name: "Vegeta",
  },
  {
    src: "https://www.hdwallpaper.nu/wp-content/uploads/2015/12/Naruto_Shippuden_17.jpg",
    name: "Naruto",
  },
  {
    src: "http://www.wikihow.com/images/b/b3/Draw-Kakashi-Intro.jpg",
    name: "Kakashi",
  },
];

const Sidebar = () => {
  const open = useSelector((store) => store.app.open);
  return (
    <div
      className={`relative left-0 ${
        open ? "w-[35%] " : "w-[15%]"
      } p-5 h-[calc(100vh-4.625rem)] bg-white overflow-y-scroll overflow-x-hidden
        dark:bg-black dark:text-white`}
    >
      {sidebarItem1.map((item, index) => {
        return (
          <div
            key={index}
            className="flex my-3 ml-3 text-center dark:text-red-500"
          >
            {item.icons}
            <p className={`ml-3 ${open ? "" : " hidden ml-0"} dark:text-white`}>
              {item.title}
            </p>
          </div>
        );
      })}
      <Underline />
      {sidebarItem2.map((item, index) => {
        return (
          <div
            key={index}
            className="flex my-3 ml-3 text-center  dark:text-red-500"
          >
            {item.icons}
            <p className={`ml-3 ${open ? "" : "hidden ml-0"} dark:text-white`}>
              {item.title}
            </p>
          </div>
        );
      })}
      <Underline />
      <div
        className={`${
          open ? "text-xl " : "text-[10px] "
        } font-bold text-center mr-1 mt-1`}
      >
        Subscriptions
      </div>
      {subscriber.map((item, index) => {
        return (
          <div key={index} className="flex my-3 ml-2 text-center">
            <Avatar src={item.src} size={50} round={true} />
            <p className={`ml-3 ${open ? "" : "hidden ml-0"} dark:text-white`}>
              {item.name}
            </p>
          </div>
        );
      })}
      <Underline />
    </div>
  );
};

export default Sidebar;
