import React, { PureComponent } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { default as AvatarEdit }from 'react-avatar-edit';
import dataURLtoFile from "../../utils/dataURLtoFile";
import { styles } from "../../AccountStyles";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Avatar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            preview: null,
            src: ''
          }
    }

    uploadHandler = () => {
    const previewInFile = dataURLtoFile(this.state.preview, "avatar.png");
    const formData = new FormData();
    formData.append('image', previewInFile, previewInFile.name);
    axios({
        method: 'POST',
        data: formData,
        url: '/upload/avatar',
    })
    .then(res =>{
        console.log(res.data.avatar);
        this.props.history.push('account');
    });
    };

    onClose = () => {
    this.setState({preview: null})
    };

    onCrop = (preview) => {
    this.setState({preview})
    };

    render() {
        const { preview, src } = this.state;
        
        return(
        <div style={styles.container}>
        <h1>My Avatar</h1>
        <div style={styles.horizontalCenter}>
        <AvatarEdit
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={src}
        />
        <Preview dataURL={preview}/>
        </div>
        <Button variant="contained" color="secondary" id={"upload"} onClick={this.uploadHandler}>Upload</Button>
      </div>
      )
    }
}

// show the preivew of the cropped avatar
const Preview = (props) => {
    return (props.dataURL === null ? <div></div> : <img style={{'margin': '50px'}} src={props.dataURL} alt="Preview"/>);
  };

Avatar.propTypes = {
    dataURL: PropTypes.string,
    onCrop: PropTypes.object,
    onClose: PropTypes.object,
    src: PropTypes.string
};

export default withRouter(Avatar);
