import React, { useEffect, useState } from 'react'

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
    <button
      style={{ padding: "10px", background: "#2563eb", color: "#fff", borderRadius: "8px" }}
      onClick={install}
    >
      Install App
    </button>
  );
}


export default InsBtn
