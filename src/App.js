import './App.css';
import React, { Component } from 'react';
import { Switch, Route , Link} from 'react-router-dom';
import UserForm from './components/users/UserForm.js';
import User from './components/users/User.js'
import LoginForm from './components/login/LoginForm'
import Test from './Test'
import Token from './components/Token'
import Event from './components/events/Event'
import InviteLandingPage from './components/invite/InviteLandingPage'

class App extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={()=>
          <div>
            <div className='home-titles'>
              <h1>Welcome to Music Room</h1>
              <p>a social music application</p>
            </div>
            <div className='home-page-links'>
              <p className='home-page-btn'><Link to='/users/new'>new user</Link></p>
              <p className='home-page-btn'><Link to='/login'>login</Link></p>
            </div>
          </div>
          }/>
          <Route path ='/users/new' render = { ()=> <UserForm/> }/>
          <Route path ='/users/:user_id' render = { ()=> <User/> }/>
          <Route path ='/login' render = {()=> <LoginForm/>}/>
          <Route path = '/token' render = { ()=> <Token/> }/>
          <Route path = '/events/:id' render = {() => <Event event/>}/>
          <Route path = '/invite' render={()=><InviteLandingPage/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
