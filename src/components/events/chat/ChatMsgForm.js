import React , {Component} from 'react'
import { connect } from 'react-redux'
import { addChatMsgToDB } from '../../Helpers'
import {withRouter} from 'react-router-dom'

class ChatMsgForm extends Component {
  constructor(){
    super()
    this.state = {
      message: ''
    }
  }

  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.dispatchNewChatMessage(e.target.msg.value)
    this.submitChatMsgToDB(e.target.msg.value)
    this.setState({
      message: ''
    })
  }

  submitChatMsgToDB(message){
    let eventId = this.props.match.url.split('/')[2]
    addChatMsgToDB({message:message, eventId:eventId, userId:this.props.user.id})
  }

  render(){
    return(
      <div className='row'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input name='msg' value={this.state.message} onChange={this.handleChange.bind(this)} type='textarea' className='chat-input col-md-12'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {eventId:state.eventId, user:state.user}
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatchNewChatMessage: (message)=> dispatch({type: 'ADD_NEW_CHAT_MSG',message:message })
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChatMsgForm))
