import { create } from "zustand";//引入 Zustand 狀態管理庫的 `create` 方法，用來建立全域狀態 store。

const useConversation = create((set) => ({//建立一個 store，裡面包含多個狀態和方法。
    selectedConversation: null,//預設目前選取的聊天對象為 `null`（尚未選取）。
//定義一個方法，讓你可以更新目前選取的聊天對象。
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],//預設訊息列表為空陣列。
    //定義一個方法，讓你可以更新訊息列表。
    setMessages: (messages) => set({ messages }),
}));
//這段程式碼建立了一個全域的聊天狀態 store，讓 React 元件可以隨時取得和更新「目前選取的聊天」和「訊息列表」。


export default useConversation;
