import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addNewMessage } from '../action-creators.js'

class ChatPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = (e) => {
			e.preventDefault();
			console.log(this.chatInput.value);
			this.socket.emit('message', { body: this.chatInput.value });
			this.chatInput.value = '';
		};

	}

	componentWillMount() {
		// this.socket = io.connect('http://localhost:3000');

		// this.socket.on('connect', () => {

		// });

		// this.socket.on('message', (messageData) => {
		// 	console.log('messageData', messageData);
		// 	this.props.addNewMessage(messageData);
		// });
	}

	render() {

		let messages = this.props.home.messages.map((message) => {
			return <div>{message.body}</div>
		});

		return(
			<div className="chat-page">
				<div className="message-display"><div className="message-feed">{messages}</div></div>
				<form id="chat-form" name="message-entry" onSubmit={this.handleSubmit.bind(this)}> 
					<div className="form-group">
						<input type="text"
						className="form-control"
						id = "chat-input"
						name = "chat-input"
						ref ={(input) => this.chatInput = input}/>
					</div>
					<button id="chat-submit" className="btn btn-default" type="submit">SEND</button>
				</form> 
			</div>
		);
	}
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state) => {
	return { home: state.home }
}

const mapDispatchToProps = (dispatch) => {
	return { 
		addNewMessage	: bindActionCreators(addNewMessage, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)