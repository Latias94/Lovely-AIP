import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import styles from '../booksPageCss';

const menu = (bookList, open, addBookIntoBooklist, bookid) => (
	<div>
		<Paper style={styles.dropDownList}>
			<List>
				{
					bookList.map(item => (
						<ListItem style={styles.dropDownItem} button key={item._id} onClick={() => addBookIntoBooklist(item._id, bookid)}>
							{item.title}
						</ListItem>
					))
				}
				<Divider/>
				<ListItem style={styles.dropDownItem} onClick={open} button key="3">Create a new book list</ListItem>
			</List>
		</Paper>
	</div>
);

const dropdown = props => (!props.isLogin ? (
	<div>
		<Paper style={styles.dropDownList}>
			<List>
				<ListItem component={Link} to='/login' style={styles.dropDownItem} key="0">
					You need to login
				</ListItem >
			</List>
		</Paper>
	</div>
) : menu(props.booklist, props.open, props.addBookIntoBooklist, props.bookid)
);

export default dropdown;
