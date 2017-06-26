import React ,{ Component } from 'react'
import { connect } from 'react-redux'

class InfoWrapper extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const displayTopTracks = this.props.artistInfo.topTracks.map((track)=><div className='top-track-item'>{track.name}</div>)
    return (
      <div className = 'InfoWrapper col-md-3'>
        <div className='row'>
          <div className='leftnavlogo col-md-12'>
            <div className='text-center leftnavlogo-text'>Music Room</div>
          </div>
        </div>
        <div className='row'>
          <div className='info-img-wrap col-md-12'>
            <img className='info-img' src={this.props.artistInfo.artistImg} height='100%'/>
          </div>
        </div>
        <div className='row'>
          <div className = 'info-panel'>
            <div className='info-content-wrap'>
              <div className='top-tracks-title'>popular</div>
               <div className='disp-top-tracks'>{displayTopTracks}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {artistInfo:state.artistInfo}
}

export default connect(mapStateToProps)(InfoWrapper)
