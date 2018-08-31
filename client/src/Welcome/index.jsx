import React, { Component } from 'react';
import Axios from 'axios';
import CarouselDIV from './carouselDIV';
import PopularBooks from './popularBooks';


export default class welcomePageIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookListArray: [],
			categoriesListArray: [],
		};
	}

	componentDidMount() {
		Axios({
			method: 'get',
			url: '/booklists',
		}).then((response) => {
			// TODO: error hint
			this.setState({ bookListArray: response.data });
			console.log(this.state.bookListArray);
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<div style={{
				height: 'auto', width: '80%', marginLeft: '10%', marginTop: '10px',
			}}>
				<CarouselDIV/>
				<PopularBooks
					bookList= {this.state.bookListArray}
					categoriesList= {[1, 2, 3, 4, 5]}
				/>
			</div>
		);
	}
}
