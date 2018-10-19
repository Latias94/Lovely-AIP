import React from 'react';
import styles from './booksPageCss';
import Modal from './childComponent/moudel';
import PopularBooks from '../Welcome/popularBooks';
import Bookinformation from './childComponent/bookInformation';
import ReviewsOfBook from './childComponent/reviewOfBook';
import ReviewEditor from './childComponent/addReview';

const BooksPageComponent = (props) => {
	const bookDetailInformation = props.bookDetailInformation;
	return (
		<div style={styles.container}>
			<Modal
				handleClose={props.handleClose}
				openMoudal={props.openMoudal}
				createANewBookList={props.createANewBookList}
			/>
			<div>
				<ul className="booksClassList">
					<li>{bookDetailInformation.categoryName}</li>
					<li> ›</li>
					<li>{bookDetailInformation.title}</li>
				</ul>
			</div>
			{/* bookinformation */}
			<Bookinformation
				coverUrl={bookDetailInformation.coverUrl}
				bookName={bookDetailInformation.title}
				bookAuthor={bookDetailInformation.authors[0].name}
				reviewScore={bookDetailInformation.score}
				bookReviews={bookDetailInformation.reviews.length}
				description={bookDetailInformation.description}
				bookPrice={bookDetailInformation.price}
				quantity={props.quantity}
				onQuantityChange={props.onQuantityChange}
				stockNumber={bookDetailInformation.stock}
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
				views={bookDetailInformation.reviews}
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
};
export default BooksPageComponent;
