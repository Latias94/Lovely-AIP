import React from 'react';
import {
	Rate, InputNumber, Menu, Dropdown, Icon,
} from 'antd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as style from './booksPageCss';
// import PopularBooks from '../welcomePage/popularBooks';


const totalPrice = (unitPrice, number) => (unitPrice * number);
const isInstock = number => (number ? 'In Stock.' : 'Out of Stock');
const menu = (
	<Menu>
		<Menu.Item key="0">
			<a href="#">1st menu item</a>
		</Menu.Item>
		<Menu.Item key="1">
			<a href="#">2nd menu item</a>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="3">3rd menu item</Menu.Item>
	</Menu>
);

const booksPageComponent = props => (
	<div style={style.container}>
		<div>
			<ul className="booksClassList">
				<li>{props.categaryName}</li>
				<li>›</li>
				<li>{props.bookName}</li>
			</ul>
		</div>
		<div style={style.mainView}>
			<div style={style.bookImage}><img src='http://localhost:3000/image/book01.jpg' style={{ width: '200px' }} alt="000" /></div>
			<div style={style.center}>
				<h3>Bookname: {props.bookName}</h3>
				<div style={style.bookInfo}>
					<h5>{`by: ${props.bookAuthor}(Author)`}</h5>
					<div ><Rate disabled value={5} /><span>{props.bookReviews}</span><span style={{ marginLeft: '5px' }}>customer reviews</span></div>
					<hr />
					<div>{props.description}</div>
				</div>
			</div>
			<div style={style.rightPart}>
				<div style={{ width: '70%', marginLeft: '15%' }}>
					<div>
						<span style={{ marginRight: '15px' }}>Buy</span>
						<InputNumber min={1} max={10} value={props.bookSelectNumber} onChange={value => props.onbookNumberChange(value)} />
						<span style={{ marginLeft: '15px' }}>{`${totalPrice(props.bookSelectNumber, props.bookPrice)}$`}</span>
					</div>
					<h4 style={{ marginTop: '15px' }}>{isInstock(props.stockNumber)}</h4>
					<span>Deliver to Australia</span>
					<hr />
					<Button variant="contained" color="default" style={{ backgroundColor: 'gray', color: 'white' }}> Add to Cart </Button>
					<Dropdown overlay={menu} trigger={['click']} >
						<Button variant="contained" color="default" style={{ backgroundColor: 'gray', color: 'white', marginTop: '15px' }}>
							Add to your List<Icon type="down" />
						</Button>
					</Dropdown>
				</div>
			</div>
		</div>
		<hr />
		<h3>Related</h3>
		{/* <PopularBooks
			bookList={m}
			categoriesList={i}
		/> */}
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
							<Rate disabled allowHalf={true} value={item.star} />
							<span>{item.content}</span>
						</div>
						<div style={style.reviewContent}>
							<span>{item.createDate}</span>
							<span>Already buied</span>
							<span style={{ fontSize: '15px' }}>{item.content}</span>
						</div>
					</div>
				))) : null
		}
		<hr style={{ margin: '0' }}/>
		<div>
			<span style={{
				fontSize: '20px', fontWeight: '400', color: 'black', marginRight: '10px',
			}}>Rate:</span><Rate allowHalf={true} onChange={value => props.reviewStarChange(value)} value={props.submittedReviewStar} style={{ marginTop: '5px' }} />
			<h5 style={{ margin: '0' }}>Content:</h5>
			<div style={{
				width: '90%', marginLeft: '5%',
			}}>
				<TextField onChange={event => props.reviewContentChange(event.target.value)} multiline fullWidth rows='4' style={{ backgroundColor: '#EEEEEE', marginTop: '5px', marginBottom: '12px' }} value={props.submittedReviewcontent} />
			</div>
			<Button size="medium" variant="contained" color="default" onClick={props.submitClick} style={{ backgroundColor: 'gray', color: 'white' }}>Review</Button>
		</div>

	</div>
);

export default booksPageComponent;
