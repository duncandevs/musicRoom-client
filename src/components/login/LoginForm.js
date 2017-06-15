import React , { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'

class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  createLogin(params){
    axios({
      url:'http://localhost:3000/login',
      method:'post',
      data: {
        username: params['username'],
        password: params['password']
      }
    }).then((res)=>{
      if(res.data.account){
        sessionStorage.setItem('username', res.data.account.username)
        sessionStorage.setItem('id', res.data.account.id)
        this.props.history.push(`/users/${res.data.account.id}`)
      }
    })
  }

  handleChange(e){
    switch(e.target.name){
      case 'username':
        this.setState({username: e.target.value});
        break
      case 'password':
        this.setState({password: e.target.value});
        break
      default:
        break
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.createLogin({username: this.state.username, password: this.state.password})
  }

  render(){
    return (
      <div>
        <form onSubmit = {this.handleSubmit.bind(this)}>
          <label>Username</label>
          <input type='text' name='username' onChange={this.handleChange.bind(this)} value={this.state.username}/>
          <label>Password</label>
          <input type='text' name='password' onChange={this.handleChange.bind(this)} value={this.state.password}/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginForm)
