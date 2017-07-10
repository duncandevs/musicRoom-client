import React , { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { getToken, getArtistsInfoByArtistId, getArtistTopTracks, getMyCurrentPlaybackState } from '../Helpers'
import InfoWrapper from './info/InfoWrapper'
import PlaylistWrapper from './playlist/PlaylistWrapper'
import ChatWrapper from './chat/ChatWrapper'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Event extends Component {
  constructor(props){
    super(props)
    this.state = {
      mobile: false
    }
  }

  componentWillMount(){
    if(window.innerWidth < 400){
      this.setState({
        mobile: true
      })
    }
    this.props.clearEvent()
  }

  componentDidMount(){
    this.props.fetchEvent(this.props.match.url)
  }

  componentDidUpdate(){
    if(this.props.token == '' || this.props.token == null || this.props.token == undefined){
      if(this.props.eventHost.id != undefined){
        this.props.setToken(this.props.eventHost.id)
        this.props.setDevice(this.props.eventHost.id)
      }
    } else {
      sessionStorage.token = this.props.token
    }
  }

  render(){
    const displayWeb = <div><InfoWrapper/><PlaylistWrapper/><ChatWrapper/></div>
    const displayMobile = <div><PlaylistWrapper/></div>
    return (
      <div className='EventWrapper'>
        {this.state.mobile ? displayMobile : displayWeb}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {event:state.event, eventHost:state.eventHost, token:state.token, user:state.user}
}

export default connect(mapStateToProps,actions)(withRouter(Event))
