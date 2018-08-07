import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_account_circle } from 'react-icons-kit/md/ic_account_circle';
import { ic_search } from 'react-icons-kit/md/ic_search';
import Logo from '../Img/logo.png';
import * as style from './headerPageCss';
import Cart from './badgeIcon';
import SearchInput from './searchIcon';

const headerPageIndex = () => (
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
			<div style={style.navigation}>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Arts & Photography</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Biographies & Memoirs</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Business & Investing</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Children's Books</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Cookbooks, Food & Wine</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>History</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Literature & Fiction</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Mystery & Suspense</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Mystery & Suspense</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Sci-Fi Fantasy</span></Link></div>
				<div style={{ display: 'table' }}><Link to='/book/1'><span style={style.navSpan}>Teens & Young Adult</span></Link></div>

			</div>
		</div>
	</div>
);

export default headerPageIndex;
