import React from 'react';
import { MessageCircle, MessageCircleDashed, MessageCircleHeart, MessageSquare } from "lucide-react";

const NoChatSelected = () => { //pure ui component
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageCircleDashed className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Vibely!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to have your vibe talk
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;