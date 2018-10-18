import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookListDataAction } from './action';
import RowofBookList from '../Search/showList';

class recommendation extends Component {
	componentDidMount() {
		this.props.getBookListDataAction();
	}

	render() {
		return (
			<div style={{
				height: 'auto', width: '80%', marginLeft: '10%', marginTop: '10px',
			}}>
				<RowofBookList content={this.props.recommendation}/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	recommendation: state.recommendationReducer.recommendation,
});

export default connect(mapStateToProps, { getBookListDataAction })(recommendation);
