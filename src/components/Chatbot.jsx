import { useState, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { TbMessageChatbot } from "react-icons/tb";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "bot",
      content: `Hey there 👋\nHow can I help you today?`,
    },
  ]);
  const [fileData, setFileData] = useState(null);
  const [position, setPosition] = useState({ x: 300, y: 10 });
  const chatBodyRef = useRef(null);
  const isDraggingRef = useRef(false);

  const toggleChatbot = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleDragStart = (e) => {
    isDraggingRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleDrag = (e) => {
    if (isDraggingRef.current) {
      setPosition({
        x: e.clientX - isDraggingRef.current.x,
        y: e.clientY - isDraggingRef.current.y,
      });
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message.trim() },
    ]);
    setMessage("");

    setChatHistory((prev) => [...prev, { role: "bot", content: "thinking" }]);

    try {
      const response = await fetch(import.meta.env.VITE_CHATBOT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message.trim() }],
            },
            ...(fileData ? [{ inline_data: fileData }] : []),
          ],
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message);

      const botMessage =
        data?.candidates[0]?.content?.parts[0]?.text
          ?.replace(/\*\*(.*?)\*\*/g, "$1")
          .trim() || "I am here to help!";
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: botMessage },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: "An error occurred." },
      ]);
    } finally {
      setFileData(null);
      chatBodyRef.current?.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileData({
        data: e.target.result.split(",")[1],
        mime_type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "move",
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <button
        onClick={toggleChatbot}
        className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center text-2xl"
      >
        {isChatOpen ? (
          <RxCross1 className="text-red-500" />
        ) : (
          <FiMessageSquare />
        )}
      </button>

      {isChatOpen && (
        <div className="w-80 bg-white dark:bg-black text-black dark:text-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between bg-indigo-600 dark:bg-gray-800 p-3 text-white">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl">
                <TbMessageChatbot />
              </span>
              <h2 className="text-lg font-semibold">VidHive Bot</h2>
            </div>
            <button onClick={toggleChatbot} className="text-xl">
              <FaArrowDown />
            </button>
          </div>

          <div
            ref={chatBodyRef}
            className="p-4 space-y-4 overflow-y-auto h-[55vh]"
          >
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : ""}`}
              >
                <div
                  className={`${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  } p-2 rounded-lg max-w-xs`}
                >
                  {msg.content === "thinking" ? (
                    <div className="flex items-center space-x-1 animate-bounce">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    </div>
                  ) : (
                    msg.content.split("\n").map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-2 bg-white dark:bg-black flex items-center gap-1"
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-[100%] p-2 border rounded-lg resize-none outline-none bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
              placeholder="Type your message..."
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-input").click()}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl"
            >
              <MdOutlineAttachFile />
            </button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileUpload}
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 text-xl"
            >
              <IoSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
