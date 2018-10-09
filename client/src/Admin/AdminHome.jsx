import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class AdminHome extends React.Component {
    render(){
        const isAdmin = this.props.isAdmin;
        
            {if (isAdmin) {
                return(            
                <div>
                    <h1 style={{color:'#00B0FF', fontSize:'100px', marginLeft:'100px', marginTop:'100px'}}>
                        Welcome Admin <br/>^~^
                    </h1>
                    <Button
                    style={{'display':'flex', 'width':'120px', marginLeft:'100px', backgroundColor:'#1E88E5' }}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={"/"}
                    >
                    Exit
                    </Button>
                </div>)
            } else {
                window.location = '/';
            }
        }
    }
}

export default connect(state => ({ isAdmin: state.auth.user.isStaff }))(AdminHome);
