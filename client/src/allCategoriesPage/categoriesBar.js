import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChildCategories from './childCategories';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},

});

class NestedList extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<List
					component="nav"
					subheader={<ListSubheader component="div">All Categories</ListSubheader>}
				>
					<ListItem button>
						<ListItemText inset primary="Sent mail" />
					</ListItem>
					{
						this.props.categoriesList.map(
							item => (
								<ChildCategories
									key = {item._id}
									categoriesName={item.name}
									subcategoriesName={item.subCategories}
								/>
							),
						)
					}
				</List>
			</div>
		);
	}
}

NestedList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
