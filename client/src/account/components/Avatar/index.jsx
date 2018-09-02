import React, { PureComponent } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { default as AvatarEdit }from 'react-avatar-edit';
import dataURLtoFile from "../../utils/dataURLtoFile";
import { styles } from "../../AccountStyles";
import { withRouter } from 'react-router-dom';

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
        url: '/upload',
    }).then(this.props.history.push('account'));
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
        <AvatarEdit
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={src}
        />
        <br/>
        <Preview dataURL={preview}/>
        <br/>
        <Button variant="contained" color="secondary" id={"upload"} onClick={this.uploadHandler}>Upload</Button>
      </div>
      )
    }
}

// show the preivew of the cropped avatar
const Preview = (props) => {
    return (props.dataURL === null ? <div></div> : <img src={props.dataURL} alt="Preview"/>);
  };

export default withRouter(Avatar);
