import React, {Component} from 'react'
import  SpotifyWebApi  from 'spotify-web-api-js'
import { connect } from 'react-redux'

class Player extends Component {
  constructor(props){
    super(props)
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken(sessionStorage.token);
  }

  play(){
    console.log('in play device id: ', this.props.device)
    this.spotifyApi.play({device_id:this.props.device,context_uri:`spotify:user:${this.props.spotifyUserId}:playlist:${this.props.event.playlists[0].spotifyId}`})
  }

  pause(){
    this.spotifyApi.pause({device_id:this.props.device})
  }

  render(){
    return(
      <div className='row'>
        <div className='player-container'>
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
  return {event:state.event, device: state.device, spotifyUserId: state.spotifyUserId, spotifyPlaylistId:state.spotifyPlaylistId}
}

export default connect(mapStateToProps)(Player)
