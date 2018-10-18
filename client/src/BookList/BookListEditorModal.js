import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert2';
import { updateBookList } from './actions';


const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
});

class BookListEditorModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMsg: '',
			isError: false,
			title: props.title,
			description: props.description
		};
		this.slug = props.slug;
		this.onSubmitHandle = this.onSubmitHandle.bind(this);
	}

	onSubmitHandle(title, description) {
		if (description.length < 10) {
			this.setState({
				errorMsg: 'Too short!',
				isError: true
			})
		} else {
			this.setState({
				isError: false
			});

			const { bookListId: id } = this.props;
			this.confirmUpdate(title, description, id, this.slug);
			this.props.handleClose();
		}
	}

	confirmUpdate(title, description, id, slug) {
		swal({
			title: 'Update?',
			showCancelButton: true,
			confirmButtonColor: '#f50057',
			cancelButtonColor: '#3f51b5',
			confirmButtonText: 'Yes',
		})
			.then((result) => {
				if (result.value) {
					updateBookList(title, description, id, slug);
				}
			})
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={!!this.props.openModal}
					onClose={this.props.handleClose}
				>
					<div style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
					     className={classes.paper}>
						<h2>Edit the book list</h2>
						<TextField
							id="standard-dense"
							label="Title"
							style={{ width: '100%' }}
							margin="dense"
							value={this.state.title}
							onChange={event => this.setState({ title: event.target.value })}
							// inputRef={title => this.setState({title: title.value})}
						/>
						<TextField
							id="standard-dense"
							label="Description (more than 10 characters)"
							style={{ width: '100%' }}
							margin="dense"
							multiline
							value={this.state.description}
							onChange={e => this.setState({ description: e.target.value })}
							// inputRef={description => this.description = description}
							helperText={this.state.errorMsg}
							error={this.state.isError}
						/>
						<Button
							variant="outlined"
							style={{ width: '100%', marginTop: '15px' }}
							onClick={() => {
								this.onSubmitHandle(this.state.title, this.state.description)
							}}>
							Submit
						</Button>
					</div>
				</Modal>
			</div>
		);
	}
}

BookListEditorModal.propTypes = {
	classes: PropTypes.object.isRequired,
	openModal: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string
};

export default withStyles(styles)(BookListEditorModal);
