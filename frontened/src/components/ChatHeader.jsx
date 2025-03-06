import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthstore } from "../store/useAuthstore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthstore();

  return (
    <div className="p-2.5 border-b border-base-300 dark:bg-[#272d65fa]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full border-2 overflow-hidden border-gray-600 relative">
              <img src={selectedUser.profilePic || "/contact.png"} alt={selectedUser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div className="flex flex-col px-2 relative">
            <h3 className="font-medium text-lg relative top-1 text-gray-300 ">{selectedUser.fullname}</h3>
            <p className="text-gray-500 font-extralight text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button className="text-gray-400" onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;