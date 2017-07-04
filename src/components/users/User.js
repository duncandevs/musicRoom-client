import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'
import { Switch, Route , Link} from 'react-router-dom';
import EventForm from '../events/EventForm'
import Event from '../events/Event'
import EventsList from '../events/EventsList'
import Token from '../Token'
import LoginSpotify from '../LoginSpotify'
import {isLoggedin, setSpotifyScopes, getToken} from '../Helpers'
import { connect } from 'react-redux'
import * as actions from '../../actions'


class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      name: '',
      user_id: undefined,
      events: []
    }
  }

  getUser(subUrl){
    return axios({
      url: `http://localhost:3000${subUrl}`,
      method: 'get'
    })
  }

  getEvents(user_id){
    return axios({
      url: `http://localhost:3000/users/${user_id}/events`,
      method: 'get'
    })
  }

  setUserState(data){
    this.setState({
      username: data.username,
      name: data.name,
      user_id: data.id
    })
  }

  setEventsState(data){
    this.setState({
      events: data
    })
  }

  handleNewEvent(newEvent){
    this.setState({
      events: [...this.state.events, newEvent]
    })
  }

  isLoggedin(){
    if(!sessionStorage.getItem('id')){
        return this.props.history.push('/login')
    }
  }

  componentWillMount(){
    this.setState({user_id:this.props.match.url})
    this.isLoggedin()
  }

  componentDidMount(){
    const userID = this.state.user_id.split('/')[2]
    this.props.setSpotifyUserId(userID)
    this.props.setToken(userID)
    
    this.getUser(this.props.match.url).then((res)=>{
      this.setUserState(res.data)
      return res.data.id
    }).then((user_id)=>{
      this.getEvents(user_id).then((res)=>{
        this.setEventsState(res.data)
      })
    })
  }

  render(){
    const path = setSpotifyScopes()
    const userDisplay =
          <div>
            <div className='user-spotify-login'><a href = { path } >login to spotify</a></div>
            <EventsList events={this.state.events}/>
            <Link to={`/users/${this.state.user_id}/events/new`}><p>new event</p></Link>
            <Switch>
              <Route path='/users/:user_id/events/new' render={(user_id)=>
                <EventForm user_id={this.state.user_id} handleNewEvent = {this.handleNewEvent.bind(this)}/>} />
              <Route path = '/users/loginspotify' render = {() => <LoginSpotify/>}/>
            </Switch>
          </div>

    return (
      <div>
        { this.state.user_id ? userDisplay : '' }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {device: state}
}

export default withRouter(connect(mapStateToProps,actions)(User))
