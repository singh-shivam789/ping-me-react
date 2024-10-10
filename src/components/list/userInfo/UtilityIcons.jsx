export default function UtilityIcons({ user }) {
    return (
        <div className={user === "chatTop" ? "iconsChat" : "iconsList"}>
            <img src={user === "chatTop" ? "/phone.png" : "/more.png"} />
            <img src={"/video.png"} />
            <img src={user === "chatTop" ? "/info.png" : "/edit.png"} />
        </div>
    )
}
