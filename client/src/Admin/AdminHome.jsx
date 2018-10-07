import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class AdminHome extends React.Component {
    render(){
        return(
            <div>
                <h1 style={{color:'#00B0FF', fontSize:'100px'}}>
                    Welcome Admin ^~^
                </h1>
                <Button 
                style={{'display':'flex', 'width':'30px', 'margin':'700px 0px 0px 40px'}}
                variant="contained"
                color="primary"
                component={Link}
                to={"/"}
                >
                Exit
                </Button>
            </div>

        );
    }
}

export default AdminHome
