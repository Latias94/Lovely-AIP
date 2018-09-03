import React, { Component } from 'react';
import CartTable from './cartTable';

class CartTablePage extends Component {
	render() {
		return (
			<div>
				<h2>Cart</h2>
				<CartTable />
			</div>
		);
	}
}

export default CartTablePage;
