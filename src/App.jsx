import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("song");
  const [videos, setVideos] = useState([]);

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
 },[search])
    

  return (
    <div className=" w-screen h-full max-w-4xl mx-auto flex flex-col items-center">
      <header className="text-3xl fixed z-20 shadow shadow-amber-50 flex justify-center w-full h-fit p-2 text-red-600 bg-zinc-200 font-bold text-center">
      <p className="text-zinc-600">... Y</p>ou <p className="text-zinc-600">T</p>ube <p className="text-zinc-600">X ...</p>
      </header>
      <div className="flex rounded-full shadow border border-black/20 overflow-hidden pl-4 mt-18 w-[80%] h-10 capitalize text-md gap-2 mb-5 justify-center">
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
          <BiSearch className="size-6 rounded-full hover:scale-125"/>
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
        {videos.map((video) => (
          <div key={video.id.videoId} className=" rounded shadow ">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
          
              className="rounded w-full h-54"
            ></iframe>
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
  );
};

export default App;
