import React, { useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useEffect } from 'react';

/* 這個元件負責顯示所有的訊息，其中包含單條訊息元件Message.jsx,將每則訊息包裝在一個 <div> 中，並使用 ref 來取得最後一則訊息的 DOM 元素
作為滾動的目標，亦作為父元件傳遞資訊給 Message.jsx */

const Messages = () => {
  const { loading, messages } = useGetMessages();
  //建立React ref,可以取得某個DOM元素的參考，這個 ref 會指向最後一則訊息的 <div> 元素。
  //對應這段 <div key={message._id} ref={lastMessageRef}>
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      //讓對話可以自動捲到最底部
      //lastMessageRef.current 會取得最後一則訊息的 <div> 元素
      //scrollIntoView({ behavior: "smooth" }) 會讓畫面平滑地捲動到該元素的位置
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

  }, [messages]);
  console.log("Messages:", messages);


  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message key={message._id} message={message} />
        </div>

      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}

    </div>
  )
}

export default Messages