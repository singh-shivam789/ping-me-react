import React from 'react'

export default function Message({message}) {
    return (
        <div className={`message ${message.styleClass}`}>
            <img src={"/avatar.png"} alt={"user.png"} className="avatar" />
            <div className="messageContainer">
                <div className="text">
                    <p>
                        {message.text}
                    </p>
                </div>
                <span className="messageTime">{message.messageTime}</span>
            </div>
        </div>
    )
}
