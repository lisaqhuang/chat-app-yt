
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include cookies for authentication

            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem('chat-user');
            //context
            setAuthUser(null);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
        localStorage.removeItem('chat-user');
        //context
        setAuthUser(null);
    }
    return { loading, logout };
}
export default useLogout;
