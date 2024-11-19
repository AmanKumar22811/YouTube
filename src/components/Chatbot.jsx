import { useState, useRef } from "react";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "bot",
      content: ` Hey there 👋 
                              How can I help you today?`,
    },
  ]);
  const [fileData, setFileData] = useState(null);
  const messageInputRef = useRef(null);
  const chatBodyRef = useRef(null);

  const toggleChatbot = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message.trim() },
    ]);
    setMessage("");

    // Bot thinking indicator with animated dots
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
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChatbot}
        className="fixed bottom-3 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center"
      >
        {isChatOpen ? "❌" : "🗨️"}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-8 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between bg-indigo-600 p-4 text-white">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <h2 className="text-lg font-semibold">Chatbot</h2>
            </div>
            <button onClick={toggleChatbot} className="text-xl">
              ⬇️
            </button>
          </div>

          <div
            ref={chatBodyRef}
            className="p-4 space-y-4 overflow-y-auto h-[45vh]"
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
                      : "bg-gray-200 text-black"
                  } p-2 rounded-lg max-w-xs`}
                >
                  {msg.content === "thinking" ? (
                    <div className="flex space-x-1">
                      <span className="inline-block font-bold animate-blink">
                        .
                      </span>
                      <span className="inline-block font-bold animate-blink delay-200">
                        .
                      </span>
                      <span className="inline-block font-bold animate-blink delay-400">
                        .
                      </span>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white flex items-center space-x-2"
          >
            <textarea
              ref={messageInputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border rounded-lg resize-none outline-none"
              placeholder="Type your message..."
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-input").click()}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              📎
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
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
