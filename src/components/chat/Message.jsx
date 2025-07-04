import useUserStore from '../../lib/stores/user/userStore'
import moment from "moment";

export default function Message({ message }) {
    const currentUser = useUserStore((state) => state.user);
    const messageTimeColor = message.userId === currentUser._id ? "whitesmoke" : "darkSlateGrey";
    return (
        <div className={`message ${message.userId === currentUser._id ? "ours" : "theirs"}`}>
            <div className="messageContainer">
                <div className="messageText">
                    <p>
                        {message.text}
                    </p>
                </div>
                <span style={{ color: messageTimeColor }} className="messageTime">{moment(message.messageTime).calendar()}</span>
            </div>
        </div>
    )
}
