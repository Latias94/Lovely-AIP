import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CustomerManage from './CustomerManage';
import BookManage from './BookManage';
import Home from '@material-ui/icons/Home';
import AdminHome from './AdminHome'


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

class Admin extends React.Component {
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
            <div className={classes.root} style={{width:'100%'}}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label=" " style={{outline:'none'}} icon={<Home />}/>
                        <Tab label="Customer" style={{outline:'none'}} />
                        <Tab label="Books" style={{outline:'none'}} />
                    </Tabs>
                </AppBar>
                {value === 0 && <AdminHome/>}
                {value === 1 && <CustomerManage/>}
                {value === 2 && <BookManage />}
            </div>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
