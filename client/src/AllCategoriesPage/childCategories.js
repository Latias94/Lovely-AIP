import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},

});

class childList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(name) {
		this.setState(state => ({ open: !state.open }));
		this.props.updateCategory({ mainCategories: name, subCategories: '' });
	}

	render() {
		return (
			<div>
				{this.props.subcategoriesName.length === 0 ? (
					<ListItem button onClick={() => this.handleClick(this.props.categoriesName)} component={Link} to={`/categories/${this.props.categoryID}`}>
						<ListItemText style={{ paddingLeft: '0px' }} inset primary={this.props.categoriesName} />
					</ListItem>
				) : (
					<ListItem button onClick={() => this.handleClick(this.props.categoriesName)}>
						<ListItemText style={{ paddingLeft: '0px' }} inset primary={this.props.categoriesName} />
						{this.state.open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
				)}
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{
							this.props.subcategoriesName.map(
								subitems => (
									<ListItem
										key={subitems._id}
										button
										onClick={() => {
											this.props.updateCategory({ mainCategories: this.props.categoriesName, subCategories: subitems.subname });
										}}
										component={Link}
										to={`/categories/${subitems.subid}`}
									>
										<ListItemText inset primary={subitems.subname} />
									</ListItem>),
							)
						}
					</List>
				</Collapse>
			</div>
		);
	}
}

childList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(childList);
