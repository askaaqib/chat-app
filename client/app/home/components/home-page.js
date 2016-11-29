import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../action-creators.js'

class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				
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
		// addNewMessage	: bindActionCreators(addNewMessage, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)