import React from 'react';
import * as style from './footerPageCss';
import Logo from '../Img/icon2.png';
import Rss from '../Img/rss.png';
import Github from '../Img/GitHub.png';
import Api from '../Img/API.png';

const footerPageIndex = () => (
	<div style={style.background}>
		<div style={style.containerDiv}>
			<img src={Logo} style={style.iconLogo} alt='logo' />
			<div style={style.footerWord}>Made by Lovely AIP</div>
            <div>
            <a  href="https://lovely-aip.herokuapp.com/api/feed/booklists" style={{marginRight:'20px'}}>
                <img src={Rss} style={{width:'40px',height:'40px', marginTop:'20px' }} alt="RSS"/>
            </a>
            <a  href="https://github.com/Latias94/Lovely-AIP" style={{marginRight:'20px'}}>
                <img src={Github} style={{width:'40px',height:'40px', marginTop:'20px'}} alt="Git repo"/>
            </a>
            <a href="https://lovely-aip.herokuapp.com/developer/ ">
                <img src={Api} style={{width:'40px',height:'40px', marginTop:'20px'}} alt="API"/>
            </a>
            </div>
		</div>
	</div>

);

export default footerPageIndex;
