import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import toast from "react-hot-toast";


const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/api/messages/${selectedConversation._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include" // Include cookies for authentication
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);//當selectedConversation改變時,重新取得message
    return { loading, messages }; //重要！！
}
export default useGetMessages;