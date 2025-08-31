import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }
        //在 conversations 陣列中尋找 fullName 包含 search 字串的對話
        const conversation = conversations.find(c => c.fullName.toLowerCase().includes(search.toLowerCase()));
        //如果在 conversations 陣列中找到符合條件的對話，則更新 selectedConversation 狀態並清空搜尋輸入框
        //更新 selectedConversation 狀態會觸發應用程式顯示該對話的訊息
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else {
            toast.error("No conversation found");
        }
    }
    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input type='text' placeholder='Search...' className='input input-bordered w-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    )
}

export default SearchInput