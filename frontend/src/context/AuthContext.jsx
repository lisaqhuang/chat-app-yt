import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

/** useContext
 * 目的為讓多個元件可以「共用」某個狀態或方法，不需要一層層用 props 傳遞。
 * 管理全域狀態（如：登入資訊、主題、語言設定）。
 * 例如：登入後，header、sidebar、profile 等元件都需要知道目前的使用者資訊，就可以用 context。
*/

//建立context，讓react app可以全域使用
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

//建立自訂的hook,讓其他任何元件中都可以使用useAuthContext來取得context的值
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);


//建立provider元件，讓App.jsx可以用這個元件包起來，讓所有子元件都可以使用context
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}