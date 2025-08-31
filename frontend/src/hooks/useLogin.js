import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (username, password) => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // 這一行很重要！
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            //localstorage
            localStorage.setItem('chat-user', JSON.stringify(data));
            //context   
            setAuthUser(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };//重要！！！一定要return出去
}
export default useLogin;