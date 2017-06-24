import React , {Component} from 'react'
import ChatMsg from './ChatMsg'
import { connect } from 'react-redux'

function ChatMsgWrapper(props){
  const displayMsgs = props.messages.map((msg)=><ChatMsg msg={msg.message}/>)
  return (
    <div className='row'>
      <div className='chat-msg-wrapper'>
        {displayMsgs}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {return {test: state.test,messages:state.messages}}
export default connect(mapStateToProps)(ChatMsgWrapper)
