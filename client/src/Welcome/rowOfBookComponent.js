import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Book from '../allCategoriesPage/aBook';

export default class rowOfBookComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth - 17,
			divTransformation: 0,
			decreaseButtonTransform: -65,
			increaseButtonTransform: 65,
		};
		this.resizeWindowChange = this.resizeWindowChange.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.increaseTransform = this.increaseTransform.bind(this);
		this.decreaseTransform = this.decreaseTransform.bind(this);
		this.decreaseButtonOver = this.decreaseButtonOver.bind(this);
		this.decreaseButtonLeave = this.decreaseButtonLeave.bind(this);
	}

	increaseTransform() {
		(this.state.divTransformation + 1) < (this.props.books.length / this.resizeWindowChange(this.state.windowWidth).numberOfCard) && this.setState({ divTransformation: this.state.divTransformation + 1 });
	}

	decreaseTransform() {
		(this.state.divTransformation >= 1) && this.setState({ divTransformation: this.state.divTransformation - 1 });
	}

	decreaseButtonOver() {
		this.setState({ decreaseButtonTransform: 0 });
	}

	decreaseButtonLeave() {
		this.setState({ decreaseButtonTransform: -65 });
	}

	increaseButtonOver() {
		this.setState({ increaseButtonTransform: 0 });
	}

	increaseButtonLeave() {
		this.setState({ increaseButtonTransform: 65 });
	}


	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize() {
		this.setState({ windowWidth: window.innerWidth - 17, divTransformation: 0 });
	}

	resizeWindowChange(windowWidth) {
		let bookMarginRight;
		windowWidth *= 0.80;
		let numberOfCard = parseInt(windowWidth / 200, 10);
		if (numberOfCard > 1) {
			bookMarginRight = (windowWidth - numberOfCard * 200) / (numberOfCard - 1);
			if (bookMarginRight <= 20) {
				numberOfCard -= 1;
				bookMarginRight = (windowWidth - numberOfCard * 200) / (numberOfCard - 1);
			}
		} else if (windowWidth > 200 && windowWidth < 400) {
			bookMarginRight = windowWidth - 200;
		} else {
			bookMarginRight = 5;
		}
		const transformation = numberOfCard * (200 + bookMarginRight);
		return {
			windowWidth, numberOfCard, bookMarginRight, transformation,
		};
	}

	render() {
		return (
			<div style={{ position: 'relative' }}>
				<Button
					onMouseOver={() => this.decreaseButtonOver()}
					onMouseLeave={() => this.decreaseButtonLeave()}
					onClick={() => this.decreaseTransform()} style={{
						zIndex: '11',
						opacity: '0.4',
						backgroundColor: 'gray',
						height: '100%',
						width: '15px',
						position: 'absolute',
						left: '0px',
						top: '0px',
						overflow: 'hidden',
						paddingLeft: '0',
						paddingRight: '0',
						transition: 'transform 0.5s',
						transform: `translateX(${this.state.decreaseButtonTransform}%)`,
					}}><ArrowLeft
						style={{
							zIndex: '5', opacity: '1', fontSize: '100px', color: 'white',
						}}/></Button>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					marginBottom: '35px',
					boxSizing: 'border-box',
					borderLeftStyle: 'solid',
					borderLeftWidth: '2px',
					borderColor: 'white',
					transform: `translateX(${-this.state.divTransformation * this.resizeWindowChange(this.state.windowWidth).transformation}px)`,
					transition: 'transform 1s',
				}}>
					{this.props.books.map(book => <Book
						bookMarginRight={this.resizeWindowChange(this.state.windowWidth).bookMarginRight}
						key={book._id}
						bookid={book._id}
						bookTitle={book.title}
						bookAuthor={book.authors[0].name}
						imagePath={book.coverUrl}
						bookPrice={book.price}
						reviewScore={book.score}
						bookReviews={book.reviews ? book.reviews.length : 0}
					/>)}
				</div>
				<Button
					onMouseOver={() => this.increaseButtonOver()}
					onMouseOut={() => this.increaseButtonLeave()}
					onClick={() => this.increaseTransform()}
					style={{
						zIndex: '11',
						opacity: '0.4',
						backgroundColor: 'black',
						height: '100%',
						width: '15px',
						position: 'absolute',
						right: '0px',
						top: '0px',
						overflow: 'hidden',
						paddingLeft: '0',
						paddingRight: '0',
						transition: 'transform 0.5s',
						transform: `translateX(${this.state.increaseButtonTransform}%)`,
					}}><ArrowRight
						style={{ zIndex: '5', fontSize: '100px', color: 'white' }} /></Button>
			</div>
		);
	}
}
