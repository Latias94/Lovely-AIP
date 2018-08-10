import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_account_circle } from 'react-icons-kit/md/ic_account_circle';
import { ic_search } from 'react-icons-kit/md/ic_search';
import Axios from 'axios';
import Logo from '../Img/logo.png';
import * as style from './headerPageCss';
import Cart from './badgeIcon';
import SearchInput from './searchIcon';
import NavigationBar from './navigationBar';


class headerPageIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	componentDidMount() {
		const requestURL = 'http://localhost:5000/api/categories';

		Axios({
			method: 'get',
			url: requestURL,
			header: {
				'Access-Control-Allow-Origin': '*',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			// TODO: error hint
			this.setState({ categories: response.data });
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<div style={style.background}>
				<div style={style.containerDiv}>
					<div style={style.logoPart}>
						<img src={Logo} style={style.iconLogo} />
						<div style={style.searchIcon}>
							<SearchInput/>
							<Icon icon={ic_search} size={24} style={{ marginBottom: '8px' }} />
						</div>
						<div style={style.rightIcon}>
							<div style={style.iconStyle}><Icon icon={ic_account_circle} size={24} /></div>
							<Cart/>
						</div>
					</div>
				</div>
				<NavigationBar/>
			</div>
		);
	}
}

export default headerPageIndex;
