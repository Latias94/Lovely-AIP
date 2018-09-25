import React from 'react';
import * as style from './footerPageCss';
import Logo from '../Img/icon2.png';

const footerPageIndex = () => (
	<div style={style.background}>
		<div style={style.containerDiv}>
			<img src={Logo} style={style.iconLogo} alt='logo' />
			<div style={style.footerWord}>This is about our company</div>
		</div>
	</div>

);

export default footerPageIndex;
