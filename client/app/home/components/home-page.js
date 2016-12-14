import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../action-creators.js'

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		
		this.joinOrCreate = undefined;

		this.handleSubmit = (e) => {
			e.preventDefault();

			let formData = {
				name: this.roomName.value,
				password: this.roomPassword.value
			};

			this.props.setUsername(this.username.value);

			if(this.joinOrCreate == 'create') {
				this.props.createRoom(formData);
			} else if(this.joinOrCreate == 'join') {
				this.props.joinRoom(formData);
			}
		};
	}

	render() {
		return(
			<div id='home-page'>
				<form id='authentication-form' name='authentication-form' onSubmit={this.handleSubmit.bind(this)}> 
					<label className="home-form-label">Username</label>
					<input type="text"
					id = "username"
					name = "username"
					className ="home-form-input"
					ref ={(input) => this.username = input}/>
					<label className="home-form-label">Room Name</label>
					<input type="text"
					id = "room-name"
					name = "room-name"
					className ="home-form-input"
					ref ={(input) => this.roomName = input}/>
					<label className="home-form-label">Password</label>
					<input type="password"
					id = "room-password"
					name = "room-password"
					className="home-form-input"
					ref ={(input) => this.roomPassword = input}/>
			
					<button className="btn home-form-submit" type="submit" onClick={ () => this.joinOrCreate = 'create' }>CREATE CHAT ROOM</button> 
					<button className="btn home-form-submit" type="submit" onClick={ () => this.joinOrCreate = 'join' }>JOIN CHAT ROOM</button>
				</form> 
				
			</div>
		)
	}
};

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state) => {
	return { home: state.home }
}

const mapDispatchToProps = (dispatch) => {
	return { 
		createRoom: bindActionCreators(actions.createRoom, dispatch),
		joinRoom: bindActionCreators(actions.joinRoom, dispatch),
		setUsername	: bindActionCreators(actions.setUsername, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)