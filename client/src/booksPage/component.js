import React from 'react';
import {
	Rate, InputNumber, Dropdown, Icon,
} from 'antd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import * as style from './booksPageCss';
import Modal from './moudel';
import PopularBooks from '../Welcome/popularBooks';


const totalPrice = (unitPrice, number) => (unitPrice * number).toFixed(2);
const isInstock = number => (number ? 'In Stock.' : 'Out of Stock');
const menu = (booklist, open, addBookIntoBooklist, bookid) => (
	<div>
		<Paper style={style.dropDownList}>
			<List>
				{
					booklist.map(item => (
						<ListItem style={style.dropDownItem} button key={item._id} onClick={() => addBookIntoBooklist(item._id, bookid)}>
							{item.title}
						</ListItem >
					))
				}
				<Divider/>
				<ListItem style={style.dropDownItem} onClick={open} button key="3">Creat a new booklist</ListItem >
			</List>
		</Paper>
	</div>
);
const dropdown = (isLogin, booklist, open, addBookIntoBooklist, bookid) => (!isLogin ? (
	<div>
		<Paper style={style.dropDownList}>
			<List>
				<ListItem button style={style.dropDownItem} key="0">
				You need to login
				</ListItem >
			</List>
		</Paper>
	</div>
) : menu(booklist, open, addBookIntoBooklist, bookid)
);
const booksPageComponent = props => (
	<div style={style.container}>
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
		<div style={style.mainView}>
			<div style={style.bookImage}><img src={props.coverUrl} style={{ width: '200px' }} alt="000" /></div>
			<div style={style.center}>
				<h3>{props.bookName}</h3>
				<div style={style.bookInfo}>
					<h5>{`by: ${props.bookAuthor}(Author)`}</h5>
					<div ><Rate disabled value={props.reviewScore} /><span>{props.bookReviews}</span><span style={{ marginLeft: '5px' }}>customer reviews</span></div>
					<hr />
					<div>{props.description}</div>
				</div>
			</div>
			<div style={style.rightPart}>
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
		{console.log('sssssssssssssssssssss', props.realtedBookList)}
		{!props.realtedBookList ? null : (<PopularBooks
			bookList={[props.realtedBookList]}
		/>)}
		<hr />
		<h3>Reviews</h3>
		{
			props.views.length !== [] ? (
				props.views.map(item => (
					<div style={style.containerOfPersonalReview} key={item._id}>
						<div style={style.viewPersonalInfromation}>
							<div style={style.userHeadImage}></div>
							<span>{item.username}</span>
						</div>
						<div style={style.viewPersonalInfromation}>
							<Rate disabled value={item.star} />
							<span>{item.content}</span>
						</div>
						<div style={style.reviewContent}>
							<span>{item.createDate}</span>
							<span>Already Bought</span>
							<span style={{ fontSize: '15px' }}>{item.content}</span>
						</div>
					</div>
				))) : null
		}
		<hr style={{ margin: '0' }}/>
		<div>
			<span style={{
				fontSize: '20px', fontWeight: '400', color: 'black', marginRight: '10px',
			}}>Rate:</span><Rate onChange={value => props.reviewStarChange(value)} value={props.submittedReviewStar} style={{ marginTop: '5px' }} />
			<h5 style={{ margin: '0' }}>Content:</h5>
			<div style={{
				width: '90%', marginLeft: '5%',
			}}>
				<TextField onChange={event => props.reviewContentChange(event.target.value)} multiline fullWidth rows='4' style={{ backgroundColor: '#EEEEEE', marginTop: '5px', marginBottom: '12px' }} value={props.submittedReviewContent} />
			</div>
			<Button size="medium" variant="contained" color="default" onClick={props.submitClick} style={{ backgroundColor: 'gray', color: 'white' }}>Review</Button>
		</div>

	</div>
);

export default booksPageComponent;
