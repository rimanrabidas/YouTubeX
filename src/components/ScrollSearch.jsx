
function ScrollSearch({setSearch}) {
   const scrollSearch=["All","Music","Mixes","Podcasts","Live","Gaming","News","Sports","Learning","Fashion","Beauty","Comedy","Movies","TV_Shows","Documentaries","Travel","Events","Science","Technology","Animals","Autos","Vehicles"]
   
   
  return (
    <div className="flex w-full overflow-scroll justify-between px-5 items-center p-1 ">
     <div className="flex gap-5 text-sm  ">
        {scrollSearch.map((item,index)=>(<p 
        onClick={(e)=>setSearch(e.target.innerText)} className='flex w-fit items-center bg-zinc-200 px-2 rounded' key={index}>{item}</p>))}
     </div>
    </div>
  )
}

export default ScrollSearch
