export default function UtilityIcons({ user }) {
    return (
        <div className={user === "chatTop" || user === "chatBottom" ? "chatIcons" : "listIcons"}>
            <img src={
                user === "chatTop" ? "/phone.png"
                    : user === "chatBottom" ? "/img.png"
                        : "/more.png"
            } />
            <img src={user === "chatBottom" ? "/camera.png" : "/video.png"} />
            <img src={
                 user === "chatTop" ? "/info.png"
                 : user === "chatBottom" ? "/mic.png"
                     : "/edit.png"
            } />
        </div>
    )
}
