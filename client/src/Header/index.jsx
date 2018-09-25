import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_search } from 'react-icons-kit/md/ic_search';
import { connect } from 'react-redux';
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

	componentDidUpdate(prevProps) {
		if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
			this.props.getUsersCart();
		}
	}

	render() {
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
						<img src={Logo} style={iconLogo} alt="logo" />
						<div style={searchIcon}>
							<SearchInput/>
							<Icon icon={ic_search} size={24} style={{ marginBottom: '8px' }} />
						</div>
						<div style={rightIcon}>
							<AuthIcon
								isAuthenticated={this.props.auth.isAuthenticated}
								logoutUser={this.props.logoutUser}
							/>
							<Cart number={this.props.cartCount} auth={this.props.auth.isAuthenticated} />
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
	getUsersCart,
})(headerPageIndex);
