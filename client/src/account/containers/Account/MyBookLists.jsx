import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { createBookList } from './actions';
import { compose } from 'redux';
import { connect } from 'react-redux';


const styles = theme => ({
	buttonWrapper: {
		position: 'relative',
		marginBottom: theme.spacing.unit * 4,
		paddingTop: '20px'
	},

	checked: {},
	typography: {
		margin: theme.spacing.unit * 2,
	},
	card: {
		minWidth: 275,
		marginTop: '10px',
		backgroundColor: '#FAFAFA',
	},
	title: {
		marginBottom: 16,
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	menu: {
		width: 200,
	},
	paper: {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		top: '26%',
		left: '30%',
		width: '44%',
		height: '31%',
	},
	addButton: {
		outline: 'none',
		backgroundColor: '#3D5AFE',
		color: '#fff',
		width: '170px',
		height: '40px',
	},
	titleStyle: {
		display: 'inline',
		fontSize: '18px',
		paddingBottom: '0',
	},
});


class MyBookLists extends React.Component {
	descriptionMinLength = 10;

	state = {
		open: false,
		isDescriptionWrong: false,
		descriptionError: null
	};

	handleCancelButton = () => {
		// init error msg
		this.setState({
			isDescriptionWrong: false,
			descriptionError: null
		});

		this.handleClose();
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	handleOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleConfirmButton = () => {
		const { description, title } = this;
		if (description.value.length > this.descriptionMinLength) {
			// post
			this.props.createBookList(title.value, description.value);
			this.handleClose();
		} else {
			this.setState({
				isDescriptionWrong: true,
				descriptionError: 'Too short!'
			})
		}
	};

	onKeyDown = e => {
		if (e.keyCode === 13) {
			this.handleConfirmButton()
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div style={{ backgroundColor: '#FAFAFA' }}>
				<Grid justify="center" spacing={0} container>
					<Grid className={classes.buttonWrapper} item>
						<Button
							className={classes.addButton}
							onClick={this.handleOpen}
							variant="contained"
						>
							+ New book list
						</Button>
						<Modal
							open={this.state.open}
							onClose={this.handleClose}
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
						>
							<div className={classes.paper}>
								<Typography id="modal-title" variant="title">
									Create a new book list
								</Typography>
								<Typography id="simple-modal-description" variant="subheading">
									<table style={{ width: '100%' }}>
										<tbody>
										<tr>
											<td>
												<TextField
													inputRef={title => this.title = title}
													className={classes.textField}
													id="BookListTitle"
													required
													label="Title"
													multiline
												/>
											</td>
											<td>
												<TextField
													onKeyDown={this.onKeyDown}
													className={classes.textField}
													style={{ width: '270px' }}
													id="BookListDescription"
													multiline
													required
													label={`Description (more than ${this.descriptionMinLength} letters)`}
													inputRef={description => this.description = description}
													error={this.state.isDescriptionWrong}
													helperText={this.state.descriptionError}
													type="text"
												/>
											</td>
										</tr>
										</tbody>
									</table>
									<Button
										onClick={this.handleCancelButton}
										style={{ margin: '2%' }}
										variant="contained"
									>
										Cancel
									</Button>
									<Button
										onClick={this.handleConfirmButton}
										variant="contained"
										color="primary"
									>
										Confirm
									</Button>
								</Typography>
							</div>
						</Modal>
					</Grid>
				</Grid>
				<div>
					{
						this.props.bookLists.map(
							(bookList) => {
								return <Card key={bookList._id} className={classes.card}>
									<CardContent>
										<Typography variant="subheading" className={classes.titleStyle}>
											<a href={'/booklist/' + bookList.slug}>
												{bookList.title}
											</a>
										</Typography>
										<Typography
											variant="caption"
											gutterBottom
											style={{ float: 'right', lineHeight: '26px' }}
										>
											Update Date: {bookList.updateDate.substring(0, 10)}
										</Typography>
									</CardContent>
								</Card>
							}
						)
					}
				</div>
			</div>
		);
	}
}

MyBookLists.propTypes = {
	bookLists: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default compose(
	withStyles(styles),
	connect(state => ({ bookLists: state.user.bookLists }), { createBookList })
)(MyBookLists);
