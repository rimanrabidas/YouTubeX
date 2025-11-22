import React, { useEffect, useState } from "react";
import axios from "axios";
import {  BiSearch } from "react-icons/bi";
import { IoIosArrowBack, IoMdArrowBack, } from "react-icons/io";
import {  IoReorderThree } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import ScrollSearch from "./components/ScrollSearch";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import InsBtn from "./components/InsBtn";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState(false);
  // const [theme, setTheme] = useState(false);
   const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);
  const [search, setSearch] = useState("song");
  const [searhDiv,setSearchDiv]=useState(false)
  const [videos, setVideos] = useState([]);
  
  const [playVideo, setPlayVideo] = useState(null);
  const [promptEvent, setPromptEvent] = useState(null);
 let newVideo= videos.sort(()=>Math.random()-0.5)
 console.log( newVideo);
 
console.log(query);
  useEffect(() => {
    
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: search,
              type: "video",
              minResults: 10,
              maxResults: 100,
              key: API_KEY,
            },
          }
        );
        setVideos(response.data.items);
        console.log(response.data.items);
        setQuery("");
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    handleSearch();
  }, [search]);

  return (
    <div
      className={` w-screen h-full max-w-4xl mx-auto flex flex-col items-center scroll-m-0`}
    >
      <div
        className={` w-full h-full flex flex-col items-center`}
      > 

      
        <div className="w-full h-20 fixed top-0 bg-white">
          <div className="">
        <header
          className={` text-xl shadow-black flex justify-between w-full p-2 text-red-600 h-12 font-bold text-center items-center gap-1  `}
        >
          {/* <div
            onClick={() => setTheme(!theme)}
            className="w-fit h-fit shadow shadow-black rounded-full"
          >
            {theme === true ? (
              <IoMdSunny className="size-8 p-1 text-yellow-500" />
            ) : (
              <IoMoon className="size-8 p-1 text-zinc-500" />
            )}
          </div>  */}

            <IoReorderThree size="30" className="text-black"/>
         
          <div className="flex text-md font-bold items-center justify-center mr-2 tracking-tight">
            <img
              className="w-8 h-[1.3rem] rounded-md "
              src="/YouTubeX.jpeg"
              alt="YouTubeX Logo"
            />
            <p className="text-zinc-600">Y</p>ou{" "}
            <p className="text-zinc-600">T</p>ube{" "}
            <p className="text-zinc-600">X</p>
          </div>
          <div className="flex gap-2 text-black h-full justify-center items-center ml-5">
            <BiSearch onClick={() =>setSearchDiv(true)} className="size-8 px-1 " />
           {promptEvent===null ? <div className="flex bg-zinc-200 h-fit rounded-full px-4 items-center text-sm font-normal py-1.5 gap-1">
              <GoPlus  className="size-5 " />
              Cerate
            </div> :
             <InsBtn promptEvent={promptEvent} setPromptEvent={setPromptEvent}/>}
          </div>
           
          <div className="p-1 shadow  rounded-full">
            <FaUserTie className="size-6 p-0.5 text-zinc-900" />
          </div>
        </header>
       { searhDiv && <div className="w-full h-12 fixed top-0 bg-white left-0 flex justify-between px-5 items-center p-1">
        <IoMdArrowBack className="size-6" onClick={() => setSearchDiv(false)} />
          <div
            className={`flex bg-white  rounded-full shadow border border-black/20 overflow-hidden pl-4 mt-5 mb-5 w-[80%] h-full capitalize text-md gap-2  justify-center`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              autoComplete="off"
              autoFocus
              className="w-full h-8 outline-none capitalize"
            />
            <button
              onClick={() => (setSearch(query), setSearchDiv(false))}
              className="text-black w-16 flex justify-center items-center h-full bg-zinc-200 hover:text-white "
            >
              <BiSearch className="size-6 rounded-full hover:scale-125" />
            </button>
          </div>
        </div>}</div>

        <ScrollSearch setSearch={setSearch}  />
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 ${playVideo===null? "mt-20":"mt-84"} overflow-scroll`}>
          {(videos||newVideo).map((video) => (
            <div key={video.id.videoId} className=" rounded shadow ">

              
              
              <div className={` w-full h-fit rounded bg-gray-300`}>
                <img loading="lazy"
                  className="w-full h-full rounded-xl"
                  onClick={() => setPlayVideo(video)}
                  src={video.snippet.thumbnails.medium.url}
                  alt="play video"
                />
              </div>
              <h3 className="text-md bg-black/10 font-semibold pl-2 pr-2">
                {video.snippet.title}
              </h3>
              <p className="text-sm text-gray-300 pl-2 pt-1 pb-2 ">
                {video.snippet.channelTitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {playVideo && (
        <div
          className={`${
            playVideo === null ? "hidden" : "flex"
          }   `}
        >
          <div className="w-full h-fit border-b pb-2 fixed top-12 left-0 bg-white">
            <div className="relative">
              <div
                onClick={() => setPlayVideo(null)}
                className="absolute w-full h-fit "
              >
                <IoIosArrowBack className="p-3 text-white size-11 animate-pulse" />
              </div>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${playVideo.id.videoId}`}
                allowFullScreen
                className="rounded w-full h-fit aspect-video"
              ></iframe>
              <div
                onClick={() => setDetails(!details)}
                className={`${
                  details === false ? "w-full h-7" : "w-full h-fit"
                } overflow-hidden p-2`}
              >
                <h3 className="text-md  font-semibold pl-2 pr-2">
                  {playVideo.snippet.title}
                </h3>
                <p className="text-sm font-medium text-zinc-500">{playVideo.snippet.description}</p>
                <p className="text-sm text-gray-600 font-bold pl-2 pt-1 pb-2 ">
                  {playVideo.snippet.channelTitle}
                </p>
                <div className="flex justify-between items-center w-fit h-8  gap-5">
                <div className="flex bg-zinc-200 rounded-full h-full justify-center items-center">
                  <div onClick={() => setLike(!like)} className="flex gap-1 justify-center items-center px-5 ">
{like===false ? <AiOutlineLike /> :
                <AiFillLike />}
                1.5M
                </div>

                  <div onClick={() => setDisLike(!disLike)} className="px-2 ">
{like===false ? <AiOutlineDislike /> :
                <AiFillDislike />}
                </div>
                </div>
                 <div className="flex justify-between items-center w-fit h-8 bg-zinc-200 rounded-full gap-5 px-5">
                  <TbShare3 />
<p>Share</p>
              </div>
              </div>
             
              </div>
            </div>
          </div>
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 overflow-scroll`}
          >
            {(playVideo===null ? videos:newVideo).map((video) => (
              <div key={video.id.videoId} className=" rounded shadow ">
                <div className={` w-full h-fit rounded-2xl bg-red-500`}>
                  <img
                    className="w-full h-full"
                    onClick={() => setPlayVideo(video)}
                    src={video.snippet.thumbnails.medium.url}
                    alt="play video"
                  />
                </div>
                <h3 className="text-md bg-black/10 font-semibold pl-2 pr-2">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-300 pl-2 pt-1 pb-2 ">
                  {video.snippet.channelTitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
