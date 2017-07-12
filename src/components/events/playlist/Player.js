import React, {Component} from 'react'
import  SpotifyWebApi  from 'spotify-web-api-js'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import * as helpers from '../../Helpers'

class Player extends Component {
  constructor(props){
    super(props)
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken(sessionStorage.token);
  }

  play(){
    this.spotifyApi.play({device_id:this.props.device,context_uri:`spotify:user:${this.props.spotifyUserId}:playlist:${this.props.event.playlists[0].spotifyId}`})
  }

  pause(){
    this.spotifyApi.pause({device_id:this.props.device})
  }

  getCurrentPlayBackState(){
    var time
    const playback = ()=>{
      if(this.props.token != ''){
        helpers.getMyCurrentPlaybackState(this.props.token).then((res)=>{
          // difference between measure and playing is going to set the timer
          console.log('in playback test timer')
        })
      }
    }
    const timer = (time,playback)=> {
      console.log('timer starts')
      console.log('time: ', time)
      console.log('playback: ', playback)
      setTimeout(function(){ console.log('times out'); playback() }, time)
    };
    playback()
    timer(time,playback)
  }

  componentDidUpdate(){
    if(this.props.queuedTracks.length != 0){
      this.props.setPlayingTrack(this.props.queuedTracks[0])
    }
    // this.getCurrentPlayBackState()
  }

  render(){
    return(
      <div className='row'>
        <div className='player-container' style={{backgroundImage: 'url(' + this.props.playing.cover + ')'}}>
          <div className='playernav col-md-offset-5'>
            <div onClick={this.play.bind(this)} className='playerbtn'><img src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-video-15.png&r=0&g=0&b=0' width='100px'/></div>
            <div onClick={this.pause.bind(this)} className='playerbtn'><img src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2017/png/iconmonstr-media-control-49.png&r=0&g=0&b=0' width='100px'/></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return {event:state.event, device: state.device, spotifyUserId: state.spotifyUserId, spotifyPlaylistId:state.spotifyPlaylistId, queuedTracks:state.queuedTracks, playing:state.playing, token:state.token}
}

export default connect(mapStateToProps,actions)(Player)


// get background image from the current playing track or top track
