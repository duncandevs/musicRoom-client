import React , {Component} from 'react'
import axios from 'axios'
import { getTrack }  from '../../Helpers'
import {connect} from 'react-redux'
import * as actions from '../../../actions'

class TrackSearchForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      queryTerm: ''
    }
  }

  handleChange(e){
    this.setState({
      queryTerm: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.toggleSearch(true)
    getTrack(this.state.queryTerm,this.props.token).then((res)=>{
      var tracks =  res.tracks.items.map((track)=>{
        return {
          name: track.name,
          artist: track.artists[0].name,
          artistSpotifyId: track.artists[0].id,
          cover: track.album.images[0].url,
          uri: track.uri,
          id: track.id,
          eventId:this.props.eventId,
          album: {
            name: track.album.name,
            uri: track.album.uri,
            image: track.album.images[0].url
          },
          voteCount: 0,
          votes: []
        }
      })
      this.props.handleNewTracks(tracks)
    })
  }

  render(){
    return (
      <div className='row'>
        <div className='search-container col-md-12'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input className='search-input' value={this.state.queryTerm} onChange={this.handleChange.bind(this)} placeholder='search songs, artists, and albums...'/>
            <input type='submit' value='search' className='btn btn-success'/>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {tracks: state.searchTracks, token: state.token, eventId:state.event.id}
}

export default connect(mapStateToProps,(actions))(TrackSearchForm)
