import "./addFriendOption.css"

export default function AddFriendOption({toggleButtonRef, setIsAddFriendSearchVisible}) {
    return (
        <div ref={toggleButtonRef} onClick={() => setIsAddFriendSearchVisible()} className='addFriendOption'>
            <img className="addImg" src="/plus.png" alt="plus.png" />
            <p>Add New Friend</p>
        </div>
    )
}