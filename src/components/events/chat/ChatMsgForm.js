import React , {Component} from 'react'
import { connect } from 'react-redux'
import { addChatMsgToDB } from '../../Helpers'
import {withRouter} from 'react-router-dom'
import * as actions from '../../../actions'

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
    var eventId = this.props.event.id
    var userId = this.props.event.eventHost.id
    var message = e.target.msg.value
    e.preventDefault()
    this.props.newChatMessage(message)
    addChatMsgToDB({message:message,userId:userId,eventId:eventId})
    this.setState({
      message: ''
    })
    this.handleMessageCreate(message)
  }

  handleMessageCreate(msgState) {
    this.props.cableApp.messages.send({content: msgState.content})
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
  return {event:state.event, user:state.user, cableApp:state.cableApp}
}

export default withRouter(connect(mapStateToProps,actions)(ChatMsgForm))
