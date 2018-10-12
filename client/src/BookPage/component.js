import React from 'react';
import PropTypes from 'prop-types';
import styles from './booksPageCss';
import Modal from './childComponent/moudel';
import PopularBooks from '../Welcome/popularBooks';
import Bookinformation from './childComponent/bookInformation';
import ReviewsOfBook from './childComponent/reviewOfBook';
import ReviewEditor from './childComponent/addReview';

const BooksPageComponent = props => (
	<div style={styles.container}>
		<Modal
			handleClose={props.handleClose}
			openMoudal={props.openMoudal}
			createANewBookList={props.createANewBookList}
		/>
		<div>
			<ul className="booksClassList">
				<li>{props.categaryName}</li>
				<li> ›</li>
				<li>{props.bookName}</li>
			</ul>
		</div>
		{/* bookinformation */}
		<Bookinformation
			coverUrl={props.coverUrl}
			bookName={props.bookName}
			bookAuthor={props.bookAuthor}
			reviewScore={props.reviewScore}
			bookReviews={props.bookReviews}
			description={props.description}
			bookPrice={props.bookPrice}
			quantity={props.quantity}
			onQuantityChange={props.onQuantityChange}
			stockNumber={props.stockNumber}
			addToCartClick={props.addToCartClick}
			authOrNot={props.authOrNot}
			usersBookList={props.usersBookList}
			handleOpen={props.handleOpen}
			addBookIntoBooklist={props.addBookIntoBooklist}
			id={props.id}
		/>
		<hr />
		{(props.relatedBookList && props.relatedBookList.books.length > 1) ? (<PopularBooks
			currentBookId={props.currentBookId}
			bookList={[props.relatedBookList]}
		/>) : null}
		<hr />
		{/* review */}
		<h3>Reviews</h3>
		<ReviewsOfBook
			views={props.views}

		/>
		<hr style={{ margin: '0' }} />
		{/* Review Editor */}
		<ReviewEditor
			reviewStarChange={props.reviewStarChange}
			submittedReviewStar={props.submittedReviewStar}
			reviewContentChange={props.reviewContentChange}
			submittedReviewContent={props.submittedReviewContent}
			submitClick={props.submitClick}
			authOrNot={props.authOrNot}
		/>
	</div>
);

BooksPageComponent.propTypes = {
	categaryName: PropTypes.string.isRequired,
	bookName: PropTypes.string.isRequired,
	coverUrl: PropTypes.string.isRequired,
	bookAuthor: PropTypes.string.isRequired,
	onQuantityChange: PropTypes.func.isRequired,
};

export default BooksPageComponent;
