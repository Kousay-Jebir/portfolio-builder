import { X, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { getReceivedMessages, getSentMessages, sendMessage } from "@/api/consulting/message";
import Cookies from "js-cookie";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5002";

export const MessagePopup = ({ profile, onClose }) => {
  const token = Cookies.get('auth-token');
  const userId = Cookies.get('user-id');
  const [mergedMessages, setMergedMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const getTimeAgo = (isoDate) => {
    const now = new Date();
    const createdAt = new Date(isoDate);
    const diffInMs = now.getTime() - createdAt.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleSend = async () => {
    if (currentMessage.trim() === "") return;

    try {
      const newMessage = {
        content: currentMessage,
        createdAt: new Date().toISOString(),
        type: "sent",
        sender: userId,
        receiver: profile.user
      };
      
      setMergedMessages(prev => [...prev, newMessage]);
      setCurrentMessage("");

      socketRef.current?.emit('message', {
        to: profile.user,
        message: currentMessage
      });

    } catch (err) {
      console.error("Failed to send message:", err);
      setMergedMessages(prev => prev.slice(0, -1));
      setCurrentMessage(currentMessage); // Restore message
    }
  };

  const fetchConversation = async () => {
    try {
      const [sentData, receivedData] = await Promise.all([
        getSentMessages(profile.user),
        getReceivedMessages(profile.user)
      ]);

      const taggedSent = sentData.map(msg => ({ ...msg, type: "sent" }));
      const taggedReceived = receivedData.map(msg => ({ ...msg, type: "received" }));

      const combined = [...taggedSent, ...taggedReceived].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setMergedMessages(combined);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mergedMessages]);

  useEffect(() => {
    fetchConversation();

    socketRef.current = io(SOCKET_URL, {
      query: { token },
      transports: ["websocket"],
      autoConnect: true
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("message", (message) => {
      setMergedMessages(prev => [
        ...prev,
        {
          content: message,
          createdAt: new Date().toISOString(),
          type: "received",
          sender: profile.user,
          receiver: userId
        }
      ]);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socketRef.current.off("message");
      socketRef.current.disconnect();
    };
  }, [profile.user, token, userId]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="border-b border-orange-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`http://localhost:5000${profile.profilePicture}`} />
              <AvatarFallback className="bg-orange-100">
                {profile.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-orange-900">{profile.firstName}</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-orange-500 hover:text-orange-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {mergedMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === "received" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] ${msg.type === "received"
                  ? "bg-orange-50 text-black"
                  : "bg-orange-600 text-white"} rounded-lg p-3`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.type === "received" ? "text-orange-500" : "text-orange-200"}`}>
                  {getTimeAgo(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-orange-100 p-4">
          <div className="relative">
            <Input
              placeholder="Type your message..."
              className="pr-12 border-orange-200 focus:ring-orange-500"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-orange-600 hover:bg-orange-700"
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};