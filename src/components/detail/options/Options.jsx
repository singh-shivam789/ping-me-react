export default function Options() {
  return (
    <div className="options">
      <div className="option sharedFiles">
        <div className="files">
          <span>Chat Settings</span>
          <div className="expandBtn">
            <img src="/arrowUp.png" alt="arrowUp.png" />
          </div>
        </div>
        <div className="filesExpanded">
        </div>
      </div>
      <div className="option sharedFiles">
        <div className="files">
          <span>Privacy & Help</span>
          <div className="expandBtn">
            <img src="/arrowUp.png" alt="arrowUp.png" />
          </div>
        </div>
        <div className="filesExpanded">
        </div>
      </div>
      <div className="option sharedFiles">
        <div className="files">
          <span>Shared Images</span>
          <div className="expandBtn">
            <img src="/arrowUp.png" alt="arrowUp.png" />
          </div>
        </div>
        <div className="filesExpanded">
        </div>
      </div>
      <div className="option sharedFiles">
        <div className="files">
          <span>Shared Files</span>
          <div className="expandBtn">
            <img src="/arrowUp.png" alt="arrowUp.png" />
          </div>
        </div>
        <div className="filesExpanded">
          <div className="file">
            <div className="previewImageInfo">
              <img className="previewImg" src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt="img.png" />
              <span className="fileName">photo_1.png</span>
            </div>
            <div className="expandBtn">
              <img src="download.png" alt="" />
            </div>
          </div>
          <div className="file">
            <div className="previewImageInfo">
              <img className="previewImg" src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt="img.png" />
              <span className="fileName">photo_1.png</span>
            </div>
            <div className="expandBtn">
              <img src="download.png" alt="" />
            </div>
          </div>
          <div className="file">
            <div className="previewImageInfo">
              <img className="previewImg" src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt="img.png" />
              <span className="fileName">photo_1.png</span>
            </div>
            <div className="expandBtn">
              <img src="download.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
