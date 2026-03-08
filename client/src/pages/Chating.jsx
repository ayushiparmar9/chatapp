import React, { useState } from "react";
import QuickNavigation from "../components/chat/QuickNavigation";
import ContactBar from "../components/chat/ContactBar";
import ChatWindow from "../components/chat/ChatWindow";

const Chating = () => {
  const [fetchMode, setFetchMode] = useState("AC");

  const [receiver, setReceiver] = useState(null);

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/20 border-r-2 border-gray-300 overflow-hidden">
          <QuickNavigation setFetchMode={setFetchMode} fetchMode={fetchMode} />
        </div>
        <div className="w-4/20 border-r-2 border-gray-300 overflow-hidden">
          <ContactBar fetchMode={fetchMode} setReceiver={setReceiver} />
        </div>
        <div className="w-15/20 border-r-2 border-gray-300 overflow-hidden">
          <ChatWindow receiver={receiver}  />
        </div>
      </div>
    </>
  );
};

export default Chating;