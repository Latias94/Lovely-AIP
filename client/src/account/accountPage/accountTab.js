import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './accountPage.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    buttonStyle: {
        flex: 1,// extend as much as it can
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


function ShowBooklist( ) {
    return (
        <div>
            <div className="createNew" style={{paddingTop:'20px'}}>
                <button type="button" className="createNew">+ Create a new list</button>
                <button type="button" className="createNew">+ Add a new book</button>
            </div>
            <ul className="accountList">
                <li>
                    <a href="listDetail">Internet Programming</a>
                    <span>Update Time: 13:14 14-01-2018</span>
                </li>
                <li>
                    <a href="listDetail">Internet Programming</a>
                    <span>Update Time: 13:14 14-01-2018</span>
                </li>
                <li>
                    <a href="listDetail">Internet Programming</a>
                    <span>Update Time: 13:14 14-01-2018</span>
                </li>
            </ul>
        </div>
        )
}

ShowBooklist.propTypes = {
    classes: PropTypes.object.isRequired,
};

function ShowOrder( ) {
    return (
            <table className="orderTb">
                <tr className="orderHeader">
                    <th >Product Name</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td className="productName">
                            <span>Book's Title</span>
                    </td>
                    <td>$<span>33</span></td>
                    <td>9</td>
                    <td>Paid</td>
                    <td>
                        <button>Review</button>
                    </td>
                </tr>
            </table>
    )
}

ShowOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};


class AccountTab extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root} style={{width:'80%'}}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="My BookList" />
                        <Tab label="My Order" />
                        <Tab label="My Payment" />
                        <Tab label="My Setting" />
                    </Tabs>
                </AppBar>
                {value === 0 && <ShowBooklist />}
                {value === 1 && <ShowOrder />}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
                {value === 3 && <TabContainer>Item Four</TabContainer>}
            </div>
        );
    }
}

AccountTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountTab);
