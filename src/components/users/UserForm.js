import React, { Component } from 'react';
import axios from 'axios'
// import { createUser } from './api';
export default class UserForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      name: '',
      password: ''
    }
  }

  createUser(params){
    return axios({
      url: 'http://localhost:3000/users',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        username: params['username'],
        name: params['name'],
        password: params['password']
      }
    })
  }

  handleChange(e){
    e.preventDefault()
    switch(e.target.name) {
      case 'name':
        this.setState({name: e.target.value}); break
      case 'username':
        this.setState({username: e.target.value}); break
      case 'password':
        this.setState({password: e.target.value}); break
      default:
        break
    }
  }

  handleSubmit(e){
    e.preventDefault()
    let name = e.target.name.value
    let username = e.target.username.value
    let password = e.target.password.value
    this.createUser({name:name ,username:username, password:password}).then((res)=>{
      // redirect to user page
    })
  }

  render(){
    return (
      <div>
        <form onSubmit = {this.handleSubmit.bind(this)}>
            <label>name</label>
            <input name='name' type = 'text' value = {this.state.name} onChange = {this.handleChange.bind(this)} />
            <label>username</label>
            <input name = 'username' type = 'text' value = {this.state.username} onChange = {this.handleChange.bind(this)} />
            <label>password</label>
            <input name = 'password' type = 'password' value = {this.state.password} onChange = {this.handleChange.bind(this)} />
            <input type = 'submit' />
        </form>
      </div>
    )
  }
}
