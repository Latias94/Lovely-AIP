import React, { Component } from 'react';
import Axios from 'axios';
import * as style from './categoriesPageCss';
import Book from './aBook';


export default class booksPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: '',
			subCategoryName: '',
			books: { books: [] },
			categoryID: '5b69933780422c14325872a7',
		};
	}

	componentDidMount() {
		let requestURL = 'http://localhost:5000/api/categories/';
		requestURL += this.state.categoryID;
		Axios({
			method: 'get',
			url: requestURL,
			header: {
				'Access-Control-Allow-Origin': '*',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			// TODO: error hint
			this.setState({ books: response.data });
			console.log(this.state.books);
		}).catch((error) => {
			console.log(error);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.categoriesID !== prevState.categoryID) {
			this.setState({ books: { books: [] }, categoryID: this.props.categoriesID });
			let requestURL = 'http://localhost:5000/api/categories/';
			requestURL += this.props.categoriesID;
			console.log(requestURL);
			Axios({
				method: 'get',
				url: requestURL,
				header: {
					'Access-Control-Allow-Origin': '*',
					'content-type': 'application/x-www-form-urlencoded',
				},
			}).then((response) => {
				console.log(response); this.setState({ books: response.data });
			}).catch((error) => {
				console.log(error);
			});
		}
		return null;
	}

	render() {
		return (
			<div style={style.booksContainer}>
				<div style={style.breadcrumbTrail}>
					<ul className="booksClassList" style={style.insideUl}>
						<li>{this.props.categoryName}</li>
						{this.props.subCategoryName
							? (<div style={{ display: 'inline' }}><li>›</li>
								<li>{this.props.subCategoryName}</li></div>) : (null)
						}
					</ul>
				</div>
				<hr style={style.hrTag} />
				<div style={style.bookRow}>
					{this.state.books.books.map(
						item => (
							<Book
								key={item._id}
								bookTitle={item.title}
								bookPrice={item.price}
								bookAuthor={item.authors[0].name}
								bookReviews={item.reviews.length}
							/>
						),
					)}
				</div>
			</div>

		);
	}
}
