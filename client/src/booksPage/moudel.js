import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
});

class SimpleModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listTitle: '',
		};
		this.onChangeHandle = this.onChangeHandle.bind(this);
	}

	onChangeHandle(title) {
		this.setState({ listTitle: title });
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={!!this.props.openMoudal}
					onClose={this.props.handleClose}
				>
					<div style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }} className={classes.paper}>
						<h2>Creat a new BookList</h2>
						<TextField
							id="standard-dense"
							label="Title"
							style={{ width: '100%' }}
							margin="dense"
							value={this.state.listTitle}
							onChange={event => this.onChangeHandle(event.target.value) }
						/>

						<Button variant="outlined" style={{ width: '100%', marginTop: '15px' }} onClick={() => { this.props.createANewBookList(this.state.listTitle); this.onChangeHandle(''); }}>Create</Button>
						<SimpleModalWrapped />
					</div>
				</Modal>
			</div>
		);
	}
}

SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
