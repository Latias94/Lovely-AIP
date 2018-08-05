import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_account_circle } from 'react-icons-kit/md/ic_account_circle';
import { ic_search } from 'react-icons-kit/md/ic_search';
import Logo from '../Img/icon2.png';
import * as style from './headerPageCss';
import Cart from './badgeIcon';
import SearchInput from './searchIcon';

const headerPageIndex = () => (
	<div style={style.background}>
		<div style={style.containerDiv}>
			<div style={style.logoPart}>
				<div style={style.leftIcon}>
					<SearchInput/>
					<Icon icon={ic_search} size={24} style={{ marginBottom: '8px' }} />
				</div>
				<img src={Logo} style={style.iconLogo} />
				<div style={style.rightIcon}>
					<div style={style.iconStyle}><Icon icon={ic_account_circle} size={24} /></div>
					<Cart />
				</div>
			</div>
			<div style={style.navigation}>
				<div style={style.navigationBar}><Link to='/'><span style={{ color: 'white', fontWeight: '100' }}>Home</span></Link></div>
				<div style={style.navigationBar}><Link to='/register'><span style={{ color: 'white', fontWeight: '100' }}>register</span></Link></div>
				<div style={style.navigationBar}><Link to='/login'><span style={{ color: 'white', fontWeight: '100' }}>login</span></Link></div>
				<div style={style.navigationBar}><Link to='/book/1'> <span style={{ color: 'white', fontWeight: '100' }}>123</span></Link></div>
			</div>
		</div>
	</div>
);

export default headerPageIndex;
