import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWelcomePageBooksDataAction } from './actions';
import CarouselDIV from './carouselDIV';
import PopularBooks from './popularBooks';
import RateStar from '../common/rateStar';

// Component of Welcome Page

class welcomePageIndex extends Component {
	componentDidMount() {
		this.props.getWelcomePageBooksDataAction();
	}


	render() {
		return (
			<div style={{
				height: 'auto', width: '80%', marginLeft: '10%', marginTop: '10px',
			}}>
				<RateStar onlyShow value={5} />
				{/* Carousel */}
				<CarouselDIV/>
				{/* Render books from database */}
				{this.props.booksInHomePage ? <PopularBooks
					bookList={this.props.booksInHomePage}
				/> : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	booksInHomePage: state.welcomePageReducer.booksInHomePage,
});

export default connect(mapStateToProps, { getWelcomePageBooksDataAction })(welcomePageIndex);
