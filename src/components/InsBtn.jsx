import React, { useEffect, useState } from 'react'
import { MdOutlineInstallMobile } from 'react-icons/md';

function InsBtn() {  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setPromptEvent(e);
    });
  }, []);

  const install = () => {
    if (!promptEvent) return;
    promptEvent.prompt();
  };

  if (!promptEvent) return null;

  return (
     <div onClick={install} className="flex bg-white text-blue-500 h-fit rounded-full px-4 items-center text-sm font-normal py-1.5 gap-1">
                  <MdOutlineInstallMobile  className="size-5 " />
                   Install
                </div>
  );
}


export default InsBtn
