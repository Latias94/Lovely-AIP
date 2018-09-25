import React from 'react';
import {
	Rate, InputNumber, Dropdown, Icon,
} from 'antd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import styles from './booksPageCss';
import Modal from './moudel';
import PopularBooks from '../Welcome/popularBooks';
import { LetterAvatar, ImageAvatar } from "../account/components/AvatarUploader/Avatars";
import config from "../config";


const totalPrice = (unitPrice, number) => (unitPrice * number).toFixed(2);
const isInstock = number => (number ? 'In Stock.' : 'Out of Stock');
const uploadBaseURL = process.env.NODE_ENV === 'production' ? config.UPLOAD_BASE_URL: config.DEV_UPLOAD_BASE_URL;

// style for avatar
const classes = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 160,
        height: 160,
    },
};

const menu = (bookList, open, addBookIntoBooklist, bookid) => (
	<div>
		<Paper style={styles.dropDownList}>
			<List>
				{
					bookList.map(item => (
						<ListItem style={styles.dropDownItem} button key={item._id} onClick={() => addBookIntoBooklist(item._id, bookid)}>
							{item.title}
						</ListItem >
					))
				}
				<Divider/>
				<ListItem style={styles.dropDownItem} onClick={open} button key="3">Create a new book list</ListItem >
			</List>
		</Paper>
	</div>
);

const dropdown = (isLogin, booklist, open, addBookIntoBooklist, bookid) => (!isLogin ? (
	<div>
		<Paper style={styles.dropDownList}>
			<List>
				<ListItem button style={styles.dropDownItem} key="0">
				You need to login
				</ListItem >
			</List>
		</Paper>
	</div>
) : menu(booklist, open, addBookIntoBooklist, bookid)
);

const convertDate = (isoDate) => {
	const date = new Date(isoDate);
	return date.toUTCString();
};

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
		<div style={styles.mainView}>
			<div style={styles.bookImage}><img src={props.coverUrl} style={{ width: '200px' }} alt="000" /></div>
			<div style={styles.center}>
				<h3>{props.bookName}</h3>
				<div style={styles.bookInfo}>
					<h5>{`by: ${props.bookAuthor}(Author)`}</h5>
					<div ><Rate disabled value={props.reviewScore} /><span>{props.bookReviews}</span><span style={{ marginLeft: '5px' }}>customer reviews</span></div>
					<hr />
					<div>{props.description}</div>
				</div>
			</div>
			<div style={styles.rightPart}>
				<div style={{ width: '76%', margin: '12%' }}>
					<div>
						<p>{`Price: $${props.bookPrice}`}</p>
						<span style={{ marginRight: '15px' }}>Buy</span>
						<InputNumber min={1} max={10} value={props.quantity} onChange={value => props.onQuantityChange(value)} />
						<div>{`$${totalPrice(props.quantity, props.bookPrice)}`}</div>
					</div>
					<h4 style={{ marginTop: '15px' }}>{isInstock(props.stockNumber)}</h4>
					<span>Deliver to Australia</span>
					<hr />
					<Button variant="contained" color="default" style={{ backgroundColor: 'gray', color: 'white', outline: 'none' }} onClick={() => props.addToCartClick(props.id)}> Add to Cart </Button>
					<Dropdown overlay={dropdown(props.authOrNot, props.usersBookList, props.handleOpen, props.addBookIntoBooklist, props.id)} trigger={['click']} >
						<Button variant="contained" color="default" style={{
							backgroundColor: 'gray', color: 'white', marginTop: '15px', outline: 'none',
						}}>
							Add to your List<Icon type="down" />
						</Button>
					</Dropdown>
				</div>
			</div>
		</div>
		<hr />
		{!props.realtedBookList ? null : (<PopularBooks
			bookList={[props.realtedBookList]}
		/>)}
		<hr />
		<h3>Reviews</h3>
		{
			props.views.length && (
				props.views.map(item => (
					<div style={styles.containerOfPersonalReview} key={item._id}>
						<div style={styles.viewPersonalInfromation}>
						{item.avatar ? 
						<ImageAvatar 
						classes={classes} 
						avatarURL={uploadBaseURL+item.avatar} 
						alt={item.username}/> :
						<LetterAvatar classes={classes} username={item.username}/>
                        }
							{/* <div style={styles.userHeadImage}></div> */}
							<span style={{marginLeft:'10px'}}>{item.username}</span>
						</div>
						<div style={styles.viewPersonalInfromation}>
							<Rate disabled value={item.star} />
							<span>{item.content}</span>
						</div>
						<div style={styles.reviewContent}>
							<span>{convertDate(item.createDate)}</span>
							<span>Already Bought</span>
							<span style={{ fontSize: '15px' }}>{item.content}</span>
						</div>
					</div>
				)))
		}
		<hr style={{ margin: '0' }}/>
		<div>
			<h3>Your review</h3>
			<span style={{
				fontSize: '20px', fontWeight: '400', color: 'black', marginRight: '10px',
			}}>Rate:</span>
			<Rate
				onChange={value => props.reviewStarChange(value)}
				value={props.submittedReviewStar}
				style={{ marginTop: '5px' }} isRequired/>
			<h5 style={{ margin: '0' }}>Content:</h5>
			<div style={{
				width: '90%', marginLeft: '5%',
			}}>
				{/* TODO: Check is it rated?*/}
				<TextField
					placeholder={'Please rate first.'}
					onChange={event => props.reviewContentChange(event.target.value)}
					multiline
					fullWidth
					rows='4'
					style={{ backgroundColor: '#EEEEEE', marginTop: '5px', marginBottom: '12px' }}
					value={props.submittedReviewContent}
				/>
			</div>
			<Button
				size="medium"
				variant="contained"
				color="default"
				onClick={props.submitClick}
				style={{ backgroundColor: 'gray', color: 'white' }}>
			Review
			</Button>
		</div>
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
