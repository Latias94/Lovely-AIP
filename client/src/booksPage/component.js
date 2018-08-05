import React from 'react';
import {Rate, InputNumber, Menu, Dropdown, Icon,} from 'antd';
import Button from '@material-ui/core/Button';
import * as style from './booksPageCss';
import PopularBooks from '../welcomePage/popularBooks';


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
const i = [1, 2, 3, 4, 5];
const m = [1];


export default props => (
	<div style={style.container}>
		<div>
			<ul className="booksClassList">
				<li>{props.categaryName}</li>
				<li>›</li>
				<li>{props.bookName}</li>
			</ul>
		</div>
		<div style={style.mainView}>
			<div style={style.bookImage}><img src={props.bookImagePath} style={{ height: '300px' }} alt="000" /></div>
			<div style={style.center}>
				<h3>Bookname: {props.bookName}</h3>
				<div style={style.bookInfo}>
					<h5>{`by: ${props.bookAuthor}(Author)`}</h5>
					<div ><Rate disabled defaultValue={props.bookRate} /><span>{props.bookReviews}</span><span style={{ marginLeft: '5px' }}>customer reviews</span></div>
					<hr />
					<div>{props.description}</div>
				</div>
			</div>
			<div style={style.rightPart}>
				<div>
					<span style={{ marginRight: '15px' }}>Buy</span>
					<InputNumber min={1} max={10} value={props.bookSelectNumber} onChange={value => props.onbookNumberChange(value)} />
					<span style={{ marginLeft: '15px' }}>{`${totalPrice(props.bookSelectNumber, props.bookPrice)}$`}</span>
					<h4>{isInstock(props.stockNumber)}</h4>
					<span>Deliver to Australia</span>
					<hr />
					<Button variant="contained" color="default" style={{ backgroundColor: 'gray', color: 'white' }}> Add to Cart </Button>
					<Dropdown overlay={menu} trigger={['click']}>
						<Button variant="contained" color="default" style={{ backgroundColor: 'gray', color: 'white' }}>
                                Add to your List<Icon type="down" />
						</Button>
					</Dropdown>
				</div>
			</div>
		</div>
		<PopularBooks
			bookList={m}
			categoriesList={i}
		/>
	</div>
);
