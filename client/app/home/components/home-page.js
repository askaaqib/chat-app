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

			if(this.joinOrCreate == 'create') {
				this.props.createRoom(formData);
			} else if(this.joinOrCreate == 'join') {
				this.props.joinRoom(formData);
			}
		};
	}

	render() {
		return(
			<div className='home-page'>
				<form className='authentication-form' name='authentication-form' onSubmit={this.handleSubmit.bind(this)}> 
					<input type="text"
					id = "room-name"
					name = "room-name"
					ref ={(input) => this.roomName = input}/>

					<input type="password"
					id = "room-password"
					name = "room-password"
					ref ={(input) => this.roomPassword = input}/>
			
					<button type="submit" onClick={ () => this.joinOrCreate = 'create' }>CREATE ROOM</button> 
					<button type="submit" onClick={ () => this.joinOrCreate = 'join' }>JOIN ROOM</button>
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
		joinRoom: bindActionCreators(actions.joinRoom, dispatch)
		// addNewMessage	: bindActionCreators(addNewMessage, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)