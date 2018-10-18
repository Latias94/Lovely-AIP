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
		this.deleteRow = this.deleteRow.bind(this);
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

	deleteRow(id) {
		axios({
			method: 'delete',
			url: `/cart/${id}`,
		})
			.then(_ => {
				window.location.reload(true);
			})
			.catch((err) => {
				console.log(err);
			});
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
				deleteRow={this.deleteRow}
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
		setEachProductsPriceAction: (number) => {
			dispatch(setEachProductsPriceAction(number));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(cartTableRow);
