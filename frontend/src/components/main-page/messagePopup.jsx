// components/main-page/messagePopup.tsx
import { X, Send, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const MessagePopup = ({ profile, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="border-b border-orange-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-orange-100">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-orange-900">{profile.name}</h3>
              <p className="text-xs text-orange-600">{profile.title}</p>
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
          <div className="flex justify-start">
            <div className="max-w-[75%] bg-orange-50 rounded-lg p-3">
              <p className="text-sm">
                Hi there! I saw your profile and was impressed by your work.
              </p>
              <p className="text-xs text-orange-500 mt-1">Just now</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[75%] bg-orange-600 text-white rounded-lg p-3">
              <p className="text-sm">
                Thank you! I'd love to connect and learn more about your
                projects.
              </p>
              <p className="text-xs text-orange-200 mt-1">Just now</p>
            </div>
          </div>
        </div>
        <div className="border-t border-orange-100 p-4">
          <div className="relative">
            <Input
              placeholder="Type your message..."
              className="pr-12 border-orange-200 focus:ring-orange-500"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-orange-600 hover:bg-orange-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
