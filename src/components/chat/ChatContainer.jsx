

export default function ChatContainer() {
  return (
    <div className="chatContainer">
      <div className="theirs">
        <img src="/avatar.png" alt="user.png" className="avatar" />
        <div className="text">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Laudantium itaque, iure modi totam voluptas expedita tempore iste est eum repellat voluptatem. 
            Obcaecati placeat ut ab soluta asperiores rerum veritatis dolor?
          </p>
        </div>
      </div>
      <div className="ours">
        <div className="text">
          <img src="https://w0.peakpx.com/wallpaper/371/259/HD-wallpaper-forza-forza-horizon-4-car.jpg" alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Laudantium itaque, iure modi totam voluptas expedita tempore iste est eum repellat voluptatem. 
            Obcaecati placeat ut ab soluta asperiores rerum veritatis dolor?
          </p>
        </div>
      </div>
    </div>
  )
}
