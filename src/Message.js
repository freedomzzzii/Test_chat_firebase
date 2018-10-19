import React, {Component} from 'react';
export default class Message extends Component {
  componentDidMount() {
    const div = document.getElementById("box");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }
  render() {
    return (
      <div>
        {
          this.props.date ?
            <span className="message__date">{new Date(this.props.date).toDateString()}</span>
            : null
        }
        <div className={`message ${this.props.className}`}>
          <span className="message__box">
            {
              this.props.className === 'left' ?
                <span className="message__author">
                  {this.props.message.userName[0]}{this.props.message.userName[1]}
                </span>
                : <span className={`message__time ${this.props.className}`}>
                  {new Date(this.props.message.time).getHours()}:{new Date(this.props.message.time).getMinutes()}
                </span>
            }
            <span className={`message__text ${this.props.className}`}>
              {this.props.message.message}
            </span>
            {
              this.props.className === 'left' ?
                <span className={`message__time ${this.props.className}`}>
                  {new Date(this.props.message.time).getHours()}:{new Date(this.props.message.time).getMinutes()}
                </span>
                : null
            }
          </span>
        </div>
      </div>
    )
  }
}