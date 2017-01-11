import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addNewEvent } from '../action-creators.js'
import { browserHistory } from 'react-router'


//chat-event types
const MESSAGE = 1;
const ROOM_JOIN = 2;
const ROOM_LEAVE = 3;

class ChatPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = (e) => {
			e.preventDefault();

			if(this.chatInput.value.length) {
				this.socket.emit('chat-event', { 
					type: MESSAGE , 
					body: this.chatInput.value,
					sender: this.props.chat.room.username,
					time: Date.now()
				});
			}
			
			this.chatInput.value = '';
		};

		this.handleKeyPress = (e) => {
			if(e.key == 'Enter'){
			  this.handleSubmit(e);
			}
		};

	}

	componentWillMount() {

		//if there's no room_id redirect to home page
		if(!this.props.chat.room.room_id) {
			browserHistory.push('/');
		}

		switch(window.location.hostname) {
			case 'localhost': 
				this.socket = io.connect('http://localhost:8080');
				break;

			case 'jor-chata.s3-website-us-west-1.amazonaws.com':
				this.socket = io.connect('http://ec2-54-183-234-7.us-west-1.compute.amazonaws.com');
				break;
		}

		//when it connects to the server join the room that passed auth
		this.socket.on('connect', () => {
				this.socket.emit('join-room', this.props.chat.room);
				// this.socket.emit('join-room', {room_id: 1});
		});

		// when the room is joined activate listener to enable messages
		this.socket.on('room-joined', (roomData) => {
			this.socket.on('chat-event', (eventData) => {
				this.props.addNewEvent(eventData);
			});

		});

	}

	render() {

		let eventItems = this.props.chat.events.map((event, i) => {
			console.log(event);
			switch(event.type) {
				case MESSAGE: 

					//converts the timestamp into a date
					let date = new Date(event.time);

					//makes for 12 hour display instead of 24
					let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
					//converts 0 AM to 12 AM
					hours = hours === 0 ? 12 : hours;

					let minutes = date.getMinutes();
					//checks if minute is less than 10 to add the 0
					minutes = minutes < 10 ? `0${minutes}`: minutes;

					let ampm = date.getHours() >= 12 ? 'PM' : 'AM';

					let messageClass;
					let textClass;
					let senderLabel;

					// determines a change in message sender from previous index and sets sender tag
					if(i === 0 || (i > 0 && event.sender != this.props.chat.events[i - 1].sender)) {
						senderLabel = <div className="sender-label">{event.sender}  <span className='message-time'> {hours}:{minutes} {ampm}</span></div>;
					}
					// sets clases for sent or received message styling
					if(event.sender == this.props.chat.room.username) {
						messageClass = "sent-message";
						textClass = "sent-message-text";
					} else {
						messageClass = "received-message";
						textClass = "received-message-text";
					}
					return (
						<div className={ messageClass } key={i}>
							<div>{ senderLabel }</div>
							<div className={ textClass }>
								{event.body}
							</div>
						</div>)

			default:
				return
			}

		});

		return(
			<div id="chat-page">
				<div ref={(element) => this.messageDisplay = element} className="message-display">
					<div className="message-feed">{eventItems}</div>
				</div>
				<form id="chat-form" name="message-entry" onSubmit={this.handleSubmit.bind(this)}> 
					<div id="chat-input-row"> 
						<textarea type="text"
						id = "chat-input"
						name = "chat-input"
						onKeyPress = {this.handleKeyPress}
						ref ={(input) => this.chatInput = input}/>
						<button id="chat-submit" className="btn" type="submit">SEND</button>
					</div> 
				</form>
			</div>
		);
	}

	componentDidUpdate() {
		this.messageDisplay.scrollTop = this.messageDisplay.scrollHeight;
	}

	componentWillUnmount() {
		this.socket.close();
	}
}


// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state) => {
	return { 
		home: state.home,
		chat: state.chat
	}
}

const mapDispatchToProps = (dispatch) => {
	return { 
		addNewEvent	: bindActionCreators(addNewEvent, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)