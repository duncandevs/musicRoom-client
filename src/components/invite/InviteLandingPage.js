import React , { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getEventByInvite } from '../Helpers'

class InviteLandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '',
      failureMSG: false
    }
  }

  validateCode(e){
    e.preventDefault()
    getEventByInvite(e.target.code.value).then((res)=>{
      if(res.data.eventId){
        this.setState({
          failureMSG: false
        })
        this.props.history.push(`/events/${res.data.eventId}`)
      } else {
        this.setState({
          failureMSG: true
        })
      }
    })
  }

  handleChange(e){
    e.preventDefault()
    this.setState({
      code: e.target.value
    })
  }

  render(){
    return (
      <div>
        <form onSubmit={this.validateCode.bind(this)}>
          <input type='text' value={this.state.code} onChange={this.handleChange.bind(this)} name='code'/>
          <input type='submit' />
        </form>
        <div>{
           this.state.failureMSG ? 'incorrect invite code' : ''
        }</div>
      </div>
    )
  }
}

export default withRouter(InviteLandingPage)
