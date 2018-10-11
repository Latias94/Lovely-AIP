import React from 'react';
import {
	Rate, InputNumber, Dropdown, Icon,
} from 'antd';
import Button from '@material-ui/core/Button';
import styles from '../booksPageCss';
import DropDownInCart from './dropDown';


const totalPrice = (unitPrice, number) => (unitPrice * number).toFixed(2);
const isInstock = number => (number ? 'In Stock.' : 'Out of Stock');

const bookInformation = props => (
	<div style={styles.mainView}>
		{props.coverUrl && <div style={styles.bookImage}><img src={props.coverUrl} style={{ width: '200px' }} alt="000" /></div>}
		<div style={styles.center}>
			<h3>{props.bookName}</h3>
			<div style={styles.bookInfo}>
				<h5>{`by ${props.bookAuthor} (Author)`}</h5>
				<div ><Rate disabled value={props.reviewScore} /><span>{props.bookReviews}</span><span style={{ marginLeft: '5px' }}>customer reviews</span></div>
				<hr />
				<pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial,sans-serif', fontSize: '16px' }}>{props.description}</pre>
			</div>
		</div>
		<div style={styles.rightPart}>
			<div style={{ width: '76%', margin: '12%', height: '100%' }}>
				<div style={{
					height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
				}}>
					<p style={{ margin: '0' }}>{`Price: $${props.bookPrice}`}</p>
					<div>
						<span style={{ marginRight: '15px' }}>Buy</span>
						<InputNumber min={1} max={10} value={props.quantity} onChange={value => props.onQuantityChange(value)} />
					</div>
					<div>{`Total: $${totalPrice(props.quantity, props.bookPrice)}`}</div>
				</div>
				<h4 style={{ marginTop: '15px' }}>{isInstock(props.stockNumber)}</h4>
				<span>Deliver to Australia</span>
				<hr />
				<Button
					variant="contained"
					color="default"
					style={{ backgroundColor: 'gray', color: 'white', outline: 'none' }}
					onClick={() => props.addToCartClick(props.id)}>
                Add to Cart
				</Button>
				<Dropdown overlay={<DropDownInCart isLogin={props.authOrNot} booklist={props.usersBookList} open={props.handleOpen} addBookIntoBooklist={props.addBookIntoBooklist} bookid={props.id} />} trigger={['click']} >
					<Button variant="contained" color="default" style={{
						backgroundColor: 'gray', color: 'white', marginTop: '15px', outline: 'none',
					}}>
                    Add to your List<Icon type="down" />
					</Button>
				</Dropdown>
			</div>
		</div>
	</div>
);

export default bookInformation;
