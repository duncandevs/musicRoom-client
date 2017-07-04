import React, { Component } from 'react';
import axios from 'axios'
import {createUserPlaylist} from '../Helpers'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class EventForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  createEvent(){
    return axios({
      url: `http://localhost:3000/users/${this.props.user_id}/events`, //subUrl = user/:user_id
      method: 'post',
      data: {
        name: this.state.name
      }
    })
  }

  createPlaylistDBEntry({spotifyId,event_id,user_id, embed_uri}){
    return axios({
      url:'http://localhost:3000/playlists',
      method:'post',
      data: {
        spotifyId: spotifyId,
        event_id: event_id,
        user_id:user_id,
        embed_uri: embed_uri
      }
    })
  }


  handleSubmit(e){
    e.preventDefault()
    this.createEvent().then((res)=>{
      this.props.handleNewEvent(res.data)
      return res.data
    }).then((event)=>{
      let playlistName = event.name + event.id.toString()
      console.log('user spotifyUserId: ', this.props.spotifyUserId)
      createUserPlaylist(this.props.spotifyUserId, this.props.token, playlistName).then((res)=>{
        this.createPlaylistDBEntry({spotifyId: res.id,event_id:event.id,user_id:sessionStorage.id, embed_uri:res.uri})
      })
    })
    this.setState({
      name: ''
    })
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  render(){
    return (
      <div>
        <p> create a new event </p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div><label>name your event</label></div>
          <input type = 'text' onChange = {this.handleChange.bind(this)} value = {this.state.name}/>
          <input type = 'submit' onSubmit = {this.handleSubmit.bind(this)} className='btn btn-primary new-event-btn' value='create'/>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {spotifyUserId: state.spotifyUserId, token:state.token}
}

export default connect(mapStateToProps,actions)(EventForm)
