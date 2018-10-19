import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import firebase from 'firebase';
import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      room: null,
    }
    this.textInput = React.createRef();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleLogOut() {
    firebase.auth().signOut();
  }

  handleCreateRoom = e => this.setState({ room: e.target.value });

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <h2>
            SIMPLE APP WITH REACT
          </h2>
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div>
        {
          // !this.state.user ?
            <div className="app__list">
              <Form user={this.state.user} />
            </div>
            // :<CreateRoom handleCreateRoom={this.handleCreateRoom} ref={this.textInput} />
        }
      </div>
    );
  }
}
export default App;

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
    };
  }

  handelRoom = e => this.setState({ room: e.target.value });

  render() {
    return(
      <div>
        <input onChange={this.handelRoom} />
        <button onClick={this.props.handleCreateRoom}>create</button>
      </div>
    );
  }
}