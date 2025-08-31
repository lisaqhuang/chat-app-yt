import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        try {
            const res = await fetch(`http://localhost:8000/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message }),
                credentials: "include" // Include cookies for authentication
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
            toast.success("Message sent successfully");
        } catch (error) {
            toast.success(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, sendMessage };
}
export default useSendMessage;