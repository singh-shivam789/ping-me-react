import React, { useState } from 'react'
export default function ForgotPassword({ setForgotPassword }) {
  const [resetPasswordClicked, setResetPasswordClicked] = useState(true);
  const handleResetPassword = async (e) => {
    //TODO: complete implementation
  }

  return (
    <div className='forgotPasswordContainer'>
      {!resetPasswordClicked ? (<div className='forgotPassword'>
        <h1>Forgot Password</h1>
        <p>Please enter your email address to reset your password.</p>
        <form style={{ display: "flex", gap: "20px", flexDirection: "column", width: "100%" }}>
          <input style={{ width: "100%" }} type="email" placeholder='Your Email' />
          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <input type="button" onClick={handleResetPassword} className='btn forgotPasswordBtn' value={"Reset"} />
            <div onClick={() => { setForgotPassword((prev) => !prev) }} className="expandBtn">
              <img src="/arrowLeft.png" />
            </div>
          </div>
        </form>
      </div>) : (
        <div className='forgotPassword'>
          <h1>Check your Inbox!</h1>
          <p>We've sent a password reset link to your email.</p>
          <div className='forgotPasswordGoBack'>
            <p>Remembered your password?</p>
            <input className='btn resetPasswordGoBack' type='button' onClick={() => { setForgotPassword((prev) => !prev) }} value={"Sign In"} />
          </div>
        </div>)}
    </div>
  )
}
