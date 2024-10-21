import { useEffect, useRef } from "react"
export default function ChatContainer() {
  useEffect(() => {
    if (msgScrollRef.current) {
      setTimeout(function () {
        msgScrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  })
  const msgScrollRef = useRef(null);
  return (
    <div className="chatContainer">
      <div className="message theirs">
        <img src="/avatar.png" alt="user.png" className="avatar" />
        <div className="messageContainer">
          <div className="text">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laudantium itaque, iure modi totam voluptas expedita tempore iste est eum repellat voluptatem.
              Obcaecati placeat ut ab soluta asperiores rerum veritatis dolor?
            </p>
          </div>
          <span className="messageTime">1 min ago</span>
        </div>
      </div>
      <div className="message ours">
        <img className="messageImage" src="https://w0.peakpx.com/wallpaper/371/259/HD-wallpaper-forza-forza-horizon-4-car.jpg" alt="" />
        <div className="text">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laudantium itaque, iure modi totam voluptas expedita tempore iste est eum repellat voluptatem.
            Obcaecati placeat ut ab soluta asperiores rerum veritatis dolor?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non aliquid vero perspiciatis accusantium doloribus consequatur, minus nulla a quod nam ab, dolores officiis, iste quos quo! Sapiente laudantium illum dolor!
          </p>
        </div>
        <span className="messageTime">1 min ago</span>
      </div>
      <div className="message theirs">
        <img src="/avatar.png" alt="user.png" className="avatar" />
        <div className="messageContainer">
          <img className="messageImage" src="https://wallpapercat.com/w/full/f/3/d/2214-3840x2160-desktop-4k-forza-horizon-wallpaper-image.jpg" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laudantium itaque, iure modi totam voluptas expedita tempore iste est eum repellat voluptatem.
              Obcaecati placeat ut ab soluta asperiores rerum veritatis dolor?
            </p>
          </div>
          <span className="messageTime">1 min ago</span>
        </div>
      </div>
      <div ref={msgScrollRef} className="scroll"></div>
    </div>
  )
}
