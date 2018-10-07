import React from 'react';
import * as style from './footerPageCss';
import Logo from '../Img/icon2.png';
import Rss from '../Img/rss.png';
import Github from '../Img/GitHub.png';

const footerPageIndex = () => (
	<div style={style.background}>
		<div style={style.containerDiv}>
			<img src={Logo} style={style.iconLogo} alt='logo' />
			<div style={style.footerWord}>Made by Lovely AIP</div>
            <div>
            <a  href="https://lovely-aip.herokuapp.com/api/feed/booklists">
                <img src={Rss} style={{width:'40px',height:'40px', marginTop:'20px', marginRight:'20px'}}/>
            </a>
            <a  href="https://github.com/Latias94/Lovely-AIP">
                <img src={Github} style={{width:'40px',height:'40px', marginTop:'20px'}}/>
            </a>
            </div>
		</div>
	</div>

);

export default footerPageIndex;
