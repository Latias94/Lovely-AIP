import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_account_circle } from 'react-icons-kit/md/ic_account_circle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import * as style from './headerPageCss';

function MenuItems(props) {
	const handleClose = props.closeHandle;
	if (props.isAuthenticated) {
		return (
			<span>
				<MenuItem component={Link} to={'/account'} onClick={handleClose}>
			My account
				</MenuItem>

				<MenuItem onClick={props.logoutUser}>
					<div onClick={handleClose}>Log out</div>
				</MenuItem>
			</span>
		);
	}
	return (
		<span>
			<MenuItem component={Link} to="/login" onClick={handleClose} >
          Log in
			</MenuItem>

			<MenuItem component={Link} to={'/register'} onClick={handleClose}>
			New here?
			</MenuItem>
		</span>
	);
}

class AuthIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClick(event) {
		this.setState({ anchorEl: event.currentTarget });
	}

	handleClose() {
		this.setState({ anchorEl: null });
	}

	render() {
		const { anchorEl } = this.state;
		const {
			avatarStyle,
		} = style;

		return (
			<div>
				<div style={avatarStyle}
					onClick={this.handleClick}
				><Icon icon={ic_account_circle} size={24} />
				</div>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
				>
					<MenuItems
						isAuthenticated={this.props.isAuthenticated}
						closeHandle={this.handleClose}
						logoutUser={this.props.logoutUser}
					/>
				</Menu>
			</div>
		);
	}
}

export default AuthIcon;
