import React from 'react'

const Message = () => {
    return (
        <div className='chat chat-end'>
            <div className='chat-image avatar'>
                <img
                    src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-64.png'
                    alt='user avatar'
                />
            </div>
            <div className={`chat-bubble text-white bg-blue-500`}>Hi! what is up</div>
        </div>
    )
}

export default Message