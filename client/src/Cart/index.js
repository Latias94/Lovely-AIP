import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CartTable from './cartTable';
import CheckoutBox from './CheckOutButton';
import * as style from './cartPageCss';
import { showErrorMsgFromObject } from '../common/utils/sweetAlert';

class CartTablePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			booksInCart: [],
		};
	}

	componentDidMount() {
		axios.get('/cart')
			.then((res) => {
				this.setState({ booksInCart: res.data });
			})
			.catch((err) => {
				showErrorMsgFromObject(err);
			});
	}

	render() {
		return (
			<div style={{ width: '90%', marginLeft: '5%', marginTop: '20px' }}>
				<h2>Cart</h2>
				<div style={style.container}>
					<div style={{ width: '80%' }}><CartTable cartBooks={this.state.booksInCart} /></div>
					<div style={{ width: '19%' }}><CheckoutBox number={this.state.booksInCart.length} totalPrice={this.props.totalPrice} /></div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		totalPrice: state.cartPageTableRowReducer.totalPrice,
	};
}

export default connect(
	mapStateToProps,
)(CartTablePage);
