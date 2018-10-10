import React, { Component } from 'react';
import axios from 'axios';
import * as style from './categoriesPageCss';
import Book from './aBook';


export default class booksPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: '',
			subCategoryName: '',
			books: { books: [] },
			categoryID: '',
		};
	}

	componentDidMount() {
		const requestURL = `/categories/${this.props.categoriesID}`;
		axios.get(requestURL)
			.then((response) => {
				this.setState({ books: response.data });
            }).catch((error) => {
				console.log(error);
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.props.categoriesID) { return null; }
		if (this.props.categoriesID !== prevProps.categoriesID) {
			this.setState({ books: { books: [] }, categoryID: this.props.categoriesID });
			let requestURL = '/categories/';
			requestURL += this.props.categoriesID;
			axios.get(requestURL)
				.then((response) => {
					this.setState({ books: response.data });
				})
				.catch((error) => {
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
								bookid={item._id}
								bookTitle={item.title}
								bookPrice={item.price}
								imagePath={item.coverUrl}
								bookAuthor={item.authors[0].name}
								bookReviews={item.reviews.length}
								reviewScore={item.score}
							/>
						),
					)}
				</div>
			</div>

		);
	}
}
