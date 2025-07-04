import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
export default function Notification() {
    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: 9999, overflow: "hidden"}} />
        </div>
    )
}
