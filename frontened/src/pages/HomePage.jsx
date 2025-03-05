import React from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'

const HomePage = () => {
   const  {selectedUser } = useChatStore();

  return (
    <div className=' flex bg-base-200'>
      <div className='sidebar'>
         <Sidebar/>
      </div>
      <div className='chat'>
        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
      </div>
    </div>
  )
}

export default HomePage