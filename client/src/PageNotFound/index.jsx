import React from 'react';
import UFO from '../Img/ufo.png';


const style ={
    headerContent: {
        color: 'gray',
        fontSize: '40px',
        textAlign: 'center',
        marginTop: '20px'
    },
    imgStyle:{
        width: '280px',
        height: '280px',
    },
    contentStyle: {
        color: 'black',
        fontSize: '26px',
        cursor: 'pointer',
        marginTop: '20px',
        textDecoration: 'underline',
    },
};

class PageNotFound extends React.Component {
	render() {
		return (
			<div>
				<h1 style={style.headerContent}>
					<p>Oooops ^~^<br/>The page can not be found.</p>
					<img src={UFO} style={style.imgStyle} alt="page not found"/>
					<p style={style.contentStyle}>
						<a href="/">I wanna go Home</a>
					</p>
				</h1>
			</div>

		);
	}
}

export default PageNotFound;
