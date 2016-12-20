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
					sender: this.props.home.username
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
			console.log(roomData);
			this.socket.on('chat-event', (eventData) => {
				this.props.addNewEvent(eventData);
			});

		});

	}

	render() {

		let eventItems = this.props.chat.events.map((event, i) => {

			switch(event.type) {
				case MESSAGE: 

					let messageClass;
					let textClass;

					if(event.sender == this.props.home.username) {
						messageClass = "sent-message";
						textClass = "sent-message-text";
					} else {
						messageClass = "received-message";
						textClass = "received-message-text";
					}
					return (

						<div className={ messageClass } key={i}>
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