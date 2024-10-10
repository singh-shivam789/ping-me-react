import React from 'react'
import ChatBottom from './ChatBottom'
import ChatMiddle from './ChatMiddle'
import ChatTop from './ChatTop'

import './chat.css'

export default function Chat() {
  return (
    <div className='chat'>
      <ChatTop />
      <ChatMiddle />
      <ChatBottom />
    </div>
  )
}
