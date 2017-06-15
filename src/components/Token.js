import React , {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import { getUserProfile } from './Helpers'

class Token extends Component {
  constructor(props){
    super(props)
    this.user_id = sessionStorage.id
  }

  createToken(token){
    return axios({
      url: `http://localhost:3000/users/${this.user_id}/token`,
      method: 'post',
      data: {
        token: token
      }
    })
  }

  createUserProfileID(profileId){
    return axios({
      url: `http://localhost:3000/users/${this.user_id}/profileId`,
      method: 'post',
      data: {
        profileId: profileId
      }
    })
  }

  componentDidMount(){
    const token = this.props.history.location.pathname.split('/token/')[1]
    this.createToken(token).then((res)=>{
      this.props.history.push(`/users/${this.user_id}`)
    }).then(
      getUserProfile(token).then((res)=>{
        this.createUserProfileID(res.id).then((res)=> console.log(res))
      })
    )
  }

  render(){
    return(
      <div>test</div>
    )
  }
}

export default withRouter(Token)
