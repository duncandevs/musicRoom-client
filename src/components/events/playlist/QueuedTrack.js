import React , { Component } from 'react'
import axios  from 'axios'
import { setTrackVote , setTrackUnVote} from '../../Helpers'
export default class QueuedTrack extends Component {
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
    setTrackVote(this.props.track.id, sessionStorage.id).then((res)=>this.props.reOrderTracks(res.data))
  }

  handleUnvoteTrack(){
    this.setState({
      votes: this.state.votes - 1,
      voted: false
    })
    setTrackUnVote(this.props.track.id, sessionStorage.id).then((res)=>this.props.reOrderTracks(res.data))
  }

  hasUserVoted(votes,userId){
    if(votes.length != 0){
      return !!votes.find((vote) => vote.user_id = userId)
    } else {
      return false
    }
  }

  componentDidMount(){
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
          <td><span>{this.state.votes}</span><span>{this.state.voted ? unvote : vote}</span></td>
      </tr>
    )
  }
}

//persist the voted in the db
//make a request to the the db to vote or unvote
//whats the route


//:TODO a non-logged in user should have an id
