import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_search } from 'react-icons-kit/md/ic_search';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import Logo from '../Img/logo.png';
import * as style from './headerPageCss';
import Cart from './badgeIcon';
import NavigationBar from './navigationBar';
import { loginUser, logoutUser } from '../account/common/actions/authActions';
import { getUsersCart } from './actions';
import AuthIcon from './authPage';


const searchType = [
	'Books',
	'Book Lists'];

class headerPageIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			cartNumber: 0,
			content: '',
			type: 0,
		};
		this.onSearchContentChange = this.onSearchContentChange.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	componentDidMount() {
		this.props.auth.isAuthenticated && this.props.getUsersCart();
	}

	componentDidUpdate(prevProps) {
		if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
			this.props.getUsersCart();
		}
	}

	onSearchContentChange(e) {
		this.setState({ content: e.target.value });
	}

	onSearchTypeChange(e) {
		this.setState({ type: e.target.value });
	}

	onSearchClick() {
		if (this.state.content.length > 0) {
			const type = searchType[this.state.type];
			window.location = `/search/${type}/${this.state.content}`;
		}
	}

	onKeyDown(e) {
		// if ENTER pushed
		if(e.keyCode === 13) {
			this.onSearchClick();
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
						<a href="/">
							<img src={Logo} style={iconLogo} alt="logo" />
						</a>
						<div style={searchIcon}>
							<NativeSelect
								id='select'
								value={this.state.type}
								onChange={e => this.onSearchTypeChange(e)}
								style={{ color: 'white' }}
								inputProps={{
									id: 'age-native-simple',
								}}
							>
								{searchType.map(
									(v, k) => (
										<option style={{ color: 'black' }} key={k} value={k}>{v}</option>
									),
								)}
							</NativeSelect>
							<Input
								value={this.state.content}
								onChange={this.onSearchContentChange}
								style={{ color: 'white' }}
								id="custom-css-input"
								onKeyDown={this.onKeyDown}
							/>
							{/* submit search */}
							<div style={{
								width: '24px', height: '24px', marginBottom: '8px', color: 'white',
								cursor: 'pointer'
							}}
							onClick={this.onSearchClick}
							>
								<Icon icon={ic_search} size={24}/></div>
						</div>
						<div style={rightIcon}>
							<AuthIcon
								isAuthenticated={this.props.auth.isAuthenticated}
								logoutUser={this.props.logoutUser}
							/>
							<Cart number={this.props.cartCount} auth={this.props.auth.isAuthenticated} />
							{this.props.isAdmin && <div
								title='Dashboard'
								onClick={() => {this.props.history.push('/admin')}}
								style={{ cursor: 'pointer', marginLeft: '15px' }}>
								<Icon icon={ic_dashboard} size={30}/>
							</div>}
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
	isAdmin: state.auth.user.isStaff,
	searchType: state.headerReducer.searchType,
	searchInputContent: state.headerReducer.searchInputContent,
});

export default connect(mapStateToProps, {
	loginUser,
	logoutUser,
	getUsersCart,
})(headerPageIndex);
