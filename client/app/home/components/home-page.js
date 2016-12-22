import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../action-creators.js'

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		
		this.roomNameInputClass = 'home-form-input';
		this.passwordInputClass = 'home-form-input';
		this.usernameInputClass = 'home-form-input';

		this.joinOrCreate = undefined;
		this.submittedForm; 
		
		this.handleSubmit = (e) => {
			e.preventDefault();

			let formData = {
				username: this.username.value,
				room_name: this.roomName.value,
				password: this.roomPassword.value
			};

			if(this.joinOrCreate == 'create') {
				this.props.createRoom(formData);
			} else if(this.joinOrCreate == 'join') {
				this.props.joinRoom(formData);
			}
			
		};

		this.setValidationClasses = (submittedForm) => {
			if(this.props.home.incomplete_form && submittedForm){
				if (!this.username.value.length) this.usernameInputClass = this.usernameInputClass + ' invalid-field';
				if (!this.roomName.value.length) this.roomNameInputClass = this.roomNameInputClass + ' invalid-field';
				if (!this.roomPassword.value.length) this.passwordInputClass = this.passwordInputClass + ' invalid-field';
			}
		}

		this.resetValidationClasses = (field) => {
			switch(field) {
				case 'username':
					this.usernameInputClass = 'home-form-input';
					this.forceUpdate();
					break;
				case 'room-name':
					this.roomNameInputClass = 'home-form-input';
					this.props.editingField(field);
					this.forceUpdate();
					break;
				case 'password': 
					this.passwordInputClass = 'home-form-input';
					this.props.editingField(field);
					this.forceUpdate();
					break;
			}
		}
	}

	render() {

		let submittedForm = this.props.home.authenticating_room || this.props.home.creating_room;
		this.setValidationClasses(submittedForm); 
		
		let roomNameTaken;
		let roomNotFound;
		let incorrectPassword;

		if(this.props.home.room_name_taken) {
			roomNameTaken = <span className='room-validation-message'>Room name is not available.</span>
		}	

		if(this.props.home.room_not_found) {
			roomNotFound = <span className='room-validation-message'>Room not found.</span>
		}

		if(this.props.home.incorrect_password) {
			incorrectPassword= <span className='room-validation-message'>Incorrect password.</span>
		}
		
		return(
			<div id='home-page'>
				<form id='authentication-form' name='authentication-form' onSubmit={this.handleSubmit.bind(this)}> 
				
					<label className="home-form-label">Username</label>
					<input type="text"
					id = "username"
					name = "username"
					className ={this.usernameInputClass}
					ref ={(input) => this.username = input}
					onChange ={this.resetValidationClasses.bind(this, 'username')}/>
				
					<label className="home-form-label">Room Name 
						{roomNameTaken} 
						{roomNotFound}
					</label>
			
					<input type="text"
					id = "room-name"
					name = "room-name"
					className ={this.roomNameInputClass}
					ref ={(input) => this.roomName = input}
					onChange ={this.resetValidationClasses.bind(this, 'room-name')}/>
			
					<label className="home-form-label">Password
						{incorrectPassword}
					</label>
					<input type="password"
					id = "room-password"
					name = "room-password"
					className={this.passwordInputClass}
					ref ={(input) => this.roomPassword = input}
					onChange ={this.resetValidationClasses.bind(this, 'password')}/>
			
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
		editingField: bindActionCreators(actions.editingField, dispatch),
		createRoom: bindActionCreators(actions.createRoom, dispatch),
		joinRoom: bindActionCreators(actions.joinRoom, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)