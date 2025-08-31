import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';

/** 聊天訊息元件 主要顯示每單條的訊息 */

//從父元件中接收message物件，此時要用{message}解構賦值
const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);

    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";


    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <img 
                    src={profilePic}
                    alt='user avatar'
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                />
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
            <div className='chat-footer text-gray-100 opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    )
}

export default Message