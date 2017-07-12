import React ,{ Component } from 'react'
import ChatPanelNav from './ChatPanelNav'
import ChatMsgWrapper from './ChatMsgWrapper'
import ChatTab from './ChatTab'
import ChatMsgForm from './ChatMsgForm'
import { addChatMsgToDB, fetchChatMsgs } from '../../Helpers'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

class ChatWrapper extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    let eventId = this.props.match.url.substring(8)
    this.props.fetchChatMessages(eventId)
  }

  render(){
    return (
      <div className = 'ChatWrapper col-md-3'>
        <ChatPanelNav/>
        <ChatMsgWrapper/>
        <ChatTab/>
        <ChatMsgForm/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {cableApp: state.cableApp}
}

export default withRouter(connect(mapStateToProps,actions)(ChatWrapper))
