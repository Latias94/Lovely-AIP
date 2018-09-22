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
			booklistID: ['5b87b6da566163069154f729', '5b87b55f566163069154f705', '5b83eda73cf33874746df9b1'],
		};
	}

	componentDidMount() {
		const thisArray = this.state.bookListArray;
		for (let item = 0; item < this.state.booklistID.length; item++) {
			Axios.get(`http://localhost:5000/api/booklists/${this.state.booklistID[item]}`)
				.then((response) => {
					thisArray.push(response.data);
					this.setState({ bookListArray: thisArray });
				}).catch((error) => {
					console.log(error);
				});
		}
	}

	render() {
		return (
			<div style={{
				height: 'auto', width: '80%', marginLeft: '10%', marginTop: '10px',
			}}>
				<CarouselDIV/>
				<PopularBooks
					bookList= {this.state.bookListArray}
                    // categoriesList= {[1, 2, 3, 4, 5]}
                />
			</div>
		);
	}
}
