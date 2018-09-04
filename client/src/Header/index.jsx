import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_search } from 'react-icons-kit/md/ic_search';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../Img/logo.png';
import * as style from './headerPageCss';
import Cart from './badgeIcon';
import SearchInput from './searchIcon';
import NavigationBar from './navigationBar';
import { loginUser, logoutUser } from '../account/actions/authActions';
import { getUsersCart } from './actions';
import AuthIcon from './authPage';

class headerPageIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			cartNumber: 0,
		};
	}

	componentDidMount() {
		this.props.getUsersCart();
	}

	render() {
		const { anchorEl } = this.state;
		const {
			background,
			containerDiv,
			logoPart,
			iconLogo,
			searchIcon,
			rightIcon,
		} = style;

		return (
			<div style={background}>
				<div style={containerDiv}>
					<div style={logoPart}>
						<img src={Logo} style={iconLogo} />
						<div style={searchIcon}>
							<SearchInput/>
							<Icon icon={ic_search} size={24} style={{ marginBottom: '8px' }} />
						</div>
						<div style={rightIcon}>
							<AuthIcon
								isAuthenticated={this.props.auth.isAuthenticated}
								logoutUser={this.props.logoutUser}
							/>
							<Cart number={this.props.cartCount} />
						</div>
					</div>
				</div>
				<NavigationBar/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	cartCount: state.headerReducer.cartNumber,
});

export default connect(mapStateToProps, { 
	loginUser, 
	logoutUser, 
	getUsersCart })(headerPageIndex);
