import React , { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getEventByInvite } from '../Helpers'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class InviteLandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '',
      username:'',
      failureMSG: false
    }
  }

  validateCode(e){
    e.preventDefault()
    //TODO: catch the error when the user submits the wrong info
    if(this.state.code == '' || this.state.username == ''){
      this.setState({failureMSG: true})

    } else {
      getEventByInvite({inviteCode:e.target.code.value, username:this.state.username}).then((res)=>{
        if(res.data.eventId){
          this.setState({
            failureMSG: false
          })
          this.props.dispatchNewGuestUser(res.data.user)
          this.props.history.push(`/events/${res.data.eventId}`)
        } else {
          this.setState({
            failureMSG: true
          })
        }
      })
    }
  }

  handleChange(e){
    e.preventDefault()
    if(e.target.name == 'code'){
      this.setState({code: e.target.value})

    } else if(e.target.name == 'username'){
      this.setState({username: e.target.value})
    }
  }

  render(){
    const failureMSG = 'incorrect invite code or username blank'
    return (
      <div>
        <div className='invite-title'>MR</div>
        <form onSubmit={this.validateCode.bind(this)} className='invite-form'>
          <label className='invite-label'>invite code</label>
          <input type='text' value={this.state.code} onChange={this.handleChange.bind(this)} name='code'/><br></br><br></br>
          <label className='invite-label'>username</label>
          <input type='text' value={this.state.username} onChange={this.handleChange.bind(this)} name='username'/><br></br><br></br>
          <input type='submit' className='invite-submit btn btn-success'/>
        </form>
        <div className='invite-login-error'>{this.state.failureMSG ? failureMSG : ''}</div>
        <label className='invite-prompt'>to enter music room please provide invite code and username</label><br></br>
      </div>
    )
  }
}


export default withRouter(connect(()=>{},actions)(InviteLandingPage))
