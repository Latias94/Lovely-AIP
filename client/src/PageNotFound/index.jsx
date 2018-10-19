import React from 'react';
import UFO from '../Img/ufo.png';

class PageNotFound extends React.Component {
	render() {
		return (
			<div>
				<h1 style={{ color: 'gray', fontSize: '40px', textAlign: 'center', marginTop: '20px' }}>
					<p>Oooops ^~^<br/>The page can not be found.</p>
					<img src={UFO} style={{ width: '280px', height: '280px' }} alt="page not found"/>
					<p
						style={{
							color: 'black',
							fontSize: '26px',
							cursor: 'pointer',
							marginTop: '20px',
							textDecoration: 'underline'
						}}>
						<a href="/">I wanna go Home</a
						>
					</p>
				</h1>
			</div>

		);
	}
}

export default PageNotFound
