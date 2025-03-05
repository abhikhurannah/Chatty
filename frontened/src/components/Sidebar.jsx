import React, { useEffect, useState } from "react";
import { LogOut, Settings, Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import sideBarSkeleton from "./skeleton/sideBarSkeleton";
import { useAuthstore } from "../store/useAuthstore";


const Sidebar = () => {
  const [search, setSearch] = useState("");
  const {getUsers,users,selectedUser,setSelectedUser,isUserLoading} = useChatStore();
  const {onlineUsers} = useAuthstore();

  useEffect(() => {
    getUsers();
  }, [getUsers])

  if (isUserLoading) return <sideBarSkeleton/> ;
  

  return (
    <div className="h-[91.35vh] w-[25vw] bg-[#0B132B] border-r border-gray-700 flex flex-col">
      {/* Sidebar Header */}
      <div className="px-6 py-2 flex items-center justify-between bg-[#0B132B] ">
        <h2 className="text-lg font-semibold text-white">Chats</h2>
        <div className="flex gap-3">
          <button className="text-gray-400 hover:text-white transition">
            <Settings size={20} />
          </button>
          <button className="text-gray-400 hover:text-red-500 transition">
            <LogOut size={20} />
          </button>
        </div>
      </div>
      {/* { todo online filter toggle} */}
      {/* Search Bar */}
      <div className="p-3">
        <div className="flex items-center bg-[#1C2541] rounded-full px-4 p-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="flex-1 bg-transparent ml-2 outline-none text-white placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 min-w-[25vw] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900">
        {users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center w-[25vw]  p-3 cursor-pointer bg-[#0B132B] hover:bg-[#3A506B] transition-all 
              ${selectedUser?._id === user._id ? "bg-[#3A506B] ring-1 ring-[#3A506B] " : "" }`}
            >
              {/* User Avatar */}
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full bg-gray-500">
                  <img
                    src={user.profilePic || "contact.png"}
                    alt={user.fullname}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                {onlineUsers.includes(user._id) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border border-white rounded-full"></div>
                )}
              </div>

              {/* Chat Info */}
              <div className="px-6">
                <h3 className="text-white font-serif font-stretch-150%">{user.fullname}</h3>
                {/*TODO  Last Message */}
                
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
