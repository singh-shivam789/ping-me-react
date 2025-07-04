export default function ListHeader({toggleButtonRef, setIsAddFriendSearchVisible}) {
  return (
    <span className='listHeader'>
        <h1>PingMe</h1>
        <div ref={toggleButtonRef} onClick={() => setIsAddFriendSearchVisible()} className='addFriendImg'>
          <img src="/new-message.png" alt="" />
        </div>
    </span>
  )
}
