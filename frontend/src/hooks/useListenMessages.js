import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import { useEffect } from 'react';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    //監聽 newMessage 事件
    useEffect(() => {
        // if (socket == null) return;
        //此段程式 會在收到 newMessage 事件時，把新訊息夾到 messages 陣列中，並加上 shouldShake 屬性
        socket.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages((prev) => [...prev, newMessage]);
            // setMessages([...messages, newMessage]);
        });
        return () => socket.off("newMessage");
        //只要 socket 或setMessages messages有變動，就重新綁定監聽事件,保 always 取得最新的 messages 狀態。
    }, [socket, setMessages, messages]);//messages一定要放到依賴陣列中，才能取得最新的值
}
export default useListenMessages;
