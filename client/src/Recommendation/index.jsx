import React, { Component } from 'react';
import Axios from 'axios';

class recommendation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendation: [],
		};
	}

	componentDidMount() {
		Axios.get('/booklists?page=1&pageSize=100')
			.then((response) => { console.log(response.data); })
			.catch((error) => { console.log(error); });
	}

	componentDidUpdate(prevProps) {
	}

	render() {
		return (
			<div >
			hellow
			</div>
		);
	}
}

// const mapStateToProps = state => ({
// 	auth: state.auth,
// 	cartCount: state.headerReducer.cartNumber,
// });

export default recommendation;
