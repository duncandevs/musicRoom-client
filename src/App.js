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
        <Test />
        <Link to='/users/new'><p> new user </p></Link>
        <Link to='/login'><p>login</p></Link>
        <Switch>
          <Route path ='/test' render = {()=> <div>test</div> }/>
          <Route path ='/users/new' render = { ()=> <UserForm/> }/>
          <Route path ='/users/:user_id' render = { ()=> <User/> }/>
          <Route path ='/login' render = {()=> <LoginForm/>}/>
          <Route path = '/token' render = { ()=> <Token/> }/>
          <Route exact path = '/events/:id' render = {() => <Event event/>}/>
          <Route path = '/invite' render={()=><InviteLandingPage/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
