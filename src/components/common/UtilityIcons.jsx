export default function UtilityIcons({ whichUserPage }) {
    return (
        <div className={whichUserPage === "chatTop" || whichUserPage === "chatBottom" ? "chatIcons" : "listIcons"}>
            <img src={
                whichUserPage === "chatTop" ? "/phone.png"
                    : whichUserPage === "chatBottom" ? "/img.png"
                        : "/more.png"
            } />
            <img src={whichUserPage === "chatBottom" ? "/camera.png" : "/video.png"} />
            <img src={
                 whichUserPage === "chatTop" ? "/info.png"
                 : whichUserPage === "chatBottom" ? "/mic.png"
                     : "/edit.png"
            } />
        </div>
    )
}
