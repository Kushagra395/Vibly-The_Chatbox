import React from "react";
import { X } from "lucide-react";
import { UseAuthStore } from "../Store/UseAuthStore(zustand)";
import { useStore } from "../Store/UseChatStore(zustand)";

const ChatHeader = () => {
  const { UserSelected, setSelectedUser } = useStore();
  const { onlineUsers } = UseAuthStore();

  return (
    <div className="  w-full  p-2.5 border-b border-base-300 justify-between items-center">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-5">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={UserSelected.profilePic || "/avatar.png"} alt={UserSelected.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{UserSelected.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(UserSelected._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button className="inline-block" onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;