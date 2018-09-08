import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RowComponent from './component';
import { setEachProductsPriceAction } from './actions';

class cartTableRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: this.props.number,
		};
		this.handleChange = this.handleChange.bind(this);
		this.deleateRow = this.deleateRow.bind(this);
		this.props.setEachProductsPriceAction(this.props.totalPrice + this.props.number * this.props.price);
	}

	handleChange(event) {
		if (event >= 1) {
			this.setState({
				number: event,
			});
			this.props.setEachProductsPriceAction(this.props.totalPrice + (event - this.state.number) * this.props.price);
		}
	}

	deleateRow(id) {
		console.log(`http://localhost:5000/api/cart/${id}`);
		axios({
			method: 'delete',
			url: `http://localhost:5000/api/cart/${id}`,
		})
			.then((res) => {
				console.log(res);
				window.location.reload(true);
			})
			.catch((err) => {
				console.log(err);
			});
		// axios.delete(`http://localhost:5000/api/cart/${id}`)
		// 	.then(() => { window.location.reload(true); });
	}

	render() {
		return (
			<RowComponent
				coverUrl={this.props.coverUrl}
				id={this.props.id}
				title={this.props.title}
				author={this.props.author}
				price={this.props.price}
				number={this.state.number}
				handleChange={this.handleChange}
				deleateRow={this.deleateRow}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		totalPrice: state.cartPageTableRowReducer.totalPrice,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setEachProductsPriceAction: (number) => { dispatch(setEachProductsPriceAction(number)); },
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(cartTableRow);
