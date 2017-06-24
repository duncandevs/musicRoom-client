import React , {Component} from 'react'
import { connect } from 'react-redux'

function ChatMsg(props){
  return(
    <div className='row chat-msg'>
      <div className='row'>
        <div className='chat-msg-profile-pic'><img src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-user-19.png&r=0&g=0&b=0' className='chat-msg-profile-pic'/></div>
        <div className='chat-msg-text'>{props.msg}</div>
      </div>
      <div className='row'><div className='chat-username'>{'@user'}</div></div>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {user:state.user}
}

export default connect(mapStateToProps)(ChatMsg)

// props.user.name != undefined ? this.props.user.name : '@user'
