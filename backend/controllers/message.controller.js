import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Assuming you have user info in req.user

        //找到 senderId和receiverId的conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        //如果沒有找到,就建立一個新的conversation，並初始化 messages 為空陣列
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId],
                //messages: [], // 初始化 messages
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            //if (!conversation.messages) conversation.messages = []; // 防呆
            conversation.messages.push(newMessage._id);//message在mongodb中的_id
            //await conversation.save(); // 儲存 conversation
        }
        await Promise.all([conversation.save(), newMessage.save()]); // 儲存 conversation 和 message

        res.status(201).json(newMessage);

    } catch (error) {
        console.error('Error sending message in controller:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id; // Assuming you have user info in req.user
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages'); // Populate messages to get full message objects --mongode 提供的方法

        if (!conversation) return res.status(200).json([]); // 如果沒有找到對話，返回空陣列
        const messages = conversation.messages || []; // 確保 messages 是一個陣列
        res.status(200).json(messages); // Return the messages array


    } catch (error) {
        console.error('Error getting messages in controller:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
