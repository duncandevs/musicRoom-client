import React , { Component } from 'react'
import axios  from 'axios'
import { setTrackVote , setTrackUnVote} from '../../Helpers'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

class QueuedTrack extends Component {
  constructor(props){
    super(props)
    this.state = {
      votes: this.props.track.voteCount,
      voted: false,
      userId: sessionStorage.id
    }
  }

  handleVoteTrack(){
    this.setState({
      votes: this.state.votes + 1,
      voted: true
    })
    setTrackVote(this.props.track.id,this.props.eventHost.id)
  }

  handleUnvoteTrack(){
    this.setState({
      votes: this.state.votes - 1,
      voted: false
    })
    setTrackUnVote(this.props.track.id, this.props.eventHost.id).then((res)=>{console.log('track unvote: ', res.data)})
  }

  hasUserVoted(votes,userId){
    if(votes.length != 0){
      return votes.find((vote) => vote.user_id == userId && vote.vote == true)
    } else {
      return false
    }
  }

  componentDidMount(){
    console.log(this.props.track.votes)
    this.setState({
      voted: this.hasUserVoted(this.props.track.votes, this.state.userId)
    })
  }

  render(){
    var track = this.props.track
    var vote = <button onClick={this.handleVoteTrack.bind(this)} className='btn btn-success'>like</button>
    var unvote = <button onClick={this.handleUnvoteTrack.bind(this)} className='btn btn-danger'>unlike</button>
    return(
      <tr>
          <td>{track.name}</td>
          <td>{track.artist}</td>
          <td>{track.album.name}</td>
          <td><span className='track-vote'>{this.state.votes}</span><span>{this.state.voted ? unvote : vote}</span></td>
      </tr>
    )
  }
}

const mapStateToProps = (state)=>{
  return {eventHost: state.event.eventHost}
}

export default connect(mapStateToProps,actions)(QueuedTrack)
