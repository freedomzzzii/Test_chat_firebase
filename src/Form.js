import React, { Component } from 'react';
import Message from './Message';
import firebase from 'firebase';
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'username',
      message: '',
      list: [],
    };
    this.messageRef = firebase.database().ref().child('test');
    this.listenMessages();
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
        time: `${new Date()}`,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }
  listenMessages() {
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val() ? message.val() : []),
        });
      });
  }

  render() {
    return (
      <div className="form">
        <div className="form__message" id="box">
          {
            this.state.list.map((item, index) => {
              if (item.userName === this.state.userName) {
                return (
                  <Message
                    className="rigth"
                    key={index}
                    message={item}
                    date={index === 0 || new Date(this.state.list[index - 1].time).getDate() !== new Date(item.time).getDate() ? item.time : null}
                  />
                );
              }
              return (
                <Message
                  className="left"
                  key={index}
                  message={item}
                  date={index === 0 || new Date(this.state.list[index - 1].time).getDate() !== new Date(item.time).getDate() ? item.time : null}
                />
              );
            })
          }
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}