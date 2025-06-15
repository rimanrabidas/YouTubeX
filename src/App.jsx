import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowBack, IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState(false);
  const [theme, setTheme] = useState(false);
  const [search, setSearch] = useState("song");
  const [videos, setVideos] = useState([]);
  const [playVideo, setPlayVideo] = useState(null);

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
      className={` w-screen h-full max-w-4xl mx-auto flex flex-col items-center`}
    >
      <div
        className={`${
          playVideo === null ? "block" : "hidden"
        } w-full h-full flex flex-col items-center`}
      >
        <header
          className={` text-xl shadow shadow-amber-50 flex justify-between w-full h-fit p-2 text-red-600 bg-zinc-200 font-bold text-center items-center gap-1`}
        >
          <div
            onClick={() => setTheme(!theme)}
            className="w-fit h-fit shadow shadow-black rounded-full"
          >
            {theme === true ? (
              <IoMdSunny className="size-8 p-1 text-yellow-500" />
            ) : (
              <IoMoon className="size-8 p-1 text-zinc-500" />
            )}
          </div>
          <div className="flex">
            <img
              className="w-10 h-7 rounded-xl mr-2"
              src="/YouTubeX.jpeg"
              alt="YouTubeX Logo"
            />
            <p className="text-zinc-600">Y</p>ou{" "}
            <p className="text-zinc-600">T</p>ube{" "}
            <p className="text-zinc-600">X</p>
          </div>
          <div className="p-1 shadow shadow-black rounded-full">
            <FaUserTie className="size-6 p-0.5 text-zinc-500" />
          </div>
        </header>
        <div className="w-full h-fit bg-white sticky top-0 left-0 flex justify-center items-center">
          <div
            className={`flex bg-white  rounded-full shadow border border-black/20 overflow-hidden pl-4 mt-5 mb-5 w-[80%] h-10 capitalize text-md gap-2  justify-center`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              autoComplete="off"
              className="w-full h-10  outline-none capitalize"
            />
            <button
              onClick={() => setSearch(query)}
              className="text-black w-16 flex justify-center items-center h-full bg-blue-500 hover:text-white "
            >
              <BiSearch className="size-6 rounded-full hover:scale-125" />
            </button>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-1`}>
          {videos.map((video) => (
            <div key={video.id.videoId} className=" rounded shadow ">
              <div className={` w-full h-54 rounded bg-gray-300`}>
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

      {playVideo && (
        <div
          className={`${
            playVideo === null ? "hidden" : "block"
          } w-screen h-full bg-white left-0 `}
        >
          <div className="w-full h-fit border-b pb-2 fixed top-0 left-0 bg-white">
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
                frameBorder="0"
                allowFullScreen
                className="rounded w-full h-64"
              ></iframe>
              <div
                onClick={() => setDetails(!details)}
                className={`${
                  details === false ? "w-full h-7" : "w-full h-fit"
                } overflow-hidden`}
              >
                <h3 className="text-md bg-black/10 font-semibold pl-2 pr-2">
                  {playVideo.snippet.title}
                </h3>
                <p>{playVideo.snippet.description}</p>
                <p className="text-sm text-gray-600 font-bold pl-2 pt-1 pb-2 ">
                  {playVideo.snippet.channelTitle}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 overflow-scroll`}
          >
            {videos.map((video) => (
              <div key={video.id.videoId} className=" rounded shadow ">
                <div className={` w-full h-54 rounded bg-gray-300`}>
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
