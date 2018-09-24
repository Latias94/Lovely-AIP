import React, { PureComponent } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import { default as AvatarEdit }from 'react-avatar-edit';
import dataURLtoFile from "../../utils/dataURLtoFile";
import { styles } from "../../AccountStyles";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAvatar } from "./actions";
import { connect } from 'react-redux';
import { compose } from "redux";


class AvatarUploader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            preview: null,
            src: null,
        };
}

    uploadHandler = () => {
    const previewInFile = dataURLtoFile(this.state.preview, "avatar.png");
    // const { preview: avatar } = this.state;
    const formData = new FormData();
    formData.append('image', previewInFile, previewInFile.name);
    Axios({
        method: 'POST',
        data: formData,
        url: '/upload/avatar',
    })
    .then(res =>{
        console.log('upload', res.data.avatar);
        this.props.setAvatar(res.data.avatar);
        this.props.history.push('account');
    });
    this.props.handleCompletion();
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
        <div style={styles.verticalCenter}>
        <AvatarEdit
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={src}
          style={{'marginBottom': '10px'}}
        />
        <Preview srcDataURL={preview}/>
        </div>
        <Button variant="contained" color="secondary" id={"upload"} onClick={this.uploadHandler} disabled={!this.state.preview}>Upload</Button>
      </div>
      )
    }
}

// show the preview of the cropped avatar
/**
 *
 * @param srcDataURL
 * base64 url
 * @returns {*}
 * @constructor
 */
const Preview = (props) => {
    return (props.srcDataURL === null ? <div></div> : <img style={{'margin': '50px'}} src={props.srcDataURL} alt="Preview"/>);
  };

Preview.propTypes = {
    srcDataURL: PropTypes.string,
};

AvatarUploader.propTypes = {
    handleCompletion: PropTypes.func
};

// export default withRouter(Avatar)
export default compose(
    withRouter,
    connect(null, { setAvatar }),
  )(AvatarUploader);
