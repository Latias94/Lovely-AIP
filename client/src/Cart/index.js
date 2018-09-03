import React, { Component } from 'react';
import axios from 'axios';
import CartTable from './cartTable';

class CartTablePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			booksInCart: [],
		};
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: 'http://localhost:5000/api/cart',
		})
			.then((res) => {
				this.setState({ booksInCart: res.data });
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div style={{ width: '90%', marginLeft: '5%', marginTop: '20px' }}>
				<h2>Cart</h2>
				<CartTable cartBooks={this.state.booksInCart} />
			</div>
		);
	}
}

export default CartTablePage;
