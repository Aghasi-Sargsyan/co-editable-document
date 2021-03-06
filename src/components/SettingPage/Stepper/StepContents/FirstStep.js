import React, { Component } from 'react';
import firebase from "firebase";
import FireManager from "../../../../firebase/FireManager";
import FileUploader from "react-firebase-file-uploader";
import defaultAvatar from "../../../../assets/profileImg.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionAddUserData } from "../../../../redux/actions/userActions";
import { TextField, withStyles, Avatar, Modal, Button } from "@material-ui/core";

class FirstStep extends Component {

    state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        photoUrl: "",
        open: false,
        userName: "",
        isLocal: false,
        isPhotoLoaded: true

    };

    componentDidMount() {
        const { user } = this.props;
        this.props.user && this.setState({
            userName: user.userName,
            photoUrl: user.photoUrl,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user.id !== this.props.user.id) {
            const { user } = this.props;
            this.props.user && this.setState({
                userName: user.userName,
                photoUrl: user.photoUrl,
            });
        }
        if (prevState.photoUrl !== this.state.photoUrl) {
            this.setState({
                isPhotoLoaded: true
            });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0, isPhotoLoaded: false });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({
                avatar: filename,
                progress: 100,
                isUploading: false,
                photoUrl: url
            }))
            .catch(err => console.error(err))
    };

    handleSendData = () => {
        const { photoUrl, userName } = this.state;
        const data = {
            photoUrl,
            userName
        };
        this.props.sendData(data);
    };

    handleUpload = () => {
        this.handleSendData();
        this.handleClose();
        this.setState({ isLocal: true, });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        }, () => this.handleSendData());
    };

    render() {
        const { userName, open, photoUrl, isLocal, isPhotoLoaded } = this.state;
        const { user, classes } = this.props;
        return (
            <div className={classes.firstStep}>
                <Modal open={open} >
                    <div className={classes.paper}>
                        <div className='flex_col'>
                            {this.state.isUploading
                                ? <p>Progress: {this.state.progress}%</p>
                                : this.state.photoUrl ?
                                    <Avatar className={classes.modalAvatar} onClick={this.handleOpen}
                                        src={this.state.photoUrl} /> :
                                    <Avatar className={classes.modalAvatar} onClick={this.handleOpen}
                                        src={user.photoUrl} />
                            }

                            <FileUploader
                                accept="image/*"
                                name="avatar"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onProgress={this.handleProgress}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                            />
                        </div>

                        <Button disabled={!isPhotoLoaded} className={classes.uploadBtn} onClick={this.handleUpload}>Set Avatar</Button>
                    </div>
                </Modal>
                <div className={classes.infoCont}>
                    <div className={classes.avatarCont}>
                        {isLocal ?
                            <Avatar className={classes.avatar} src={photoUrl} />
                            :
                            <Avatar className={classes.avatar} src={user.photoUrl ? user.photoUrl : defaultAvatar} />
                        }
                        <Button onClick={this.handleOpen} className={classes.btn}>Edit profile image</Button>
                    </div>
                    <TextField
                        id="userName"
                        label="Username"
                        className={classes.textField}
                        value={userName}
                        onChange={this.handleChange("userName")}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
    avatar: {
        width: 120,
        height: 120
    },
    firstStep: {
        display: "flex",
    },
    infoCont: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        "& button": {
            backgroundColor: "#8fb9ea",
            color: "white",
            marginTop: 15,
            "&:hover": {
                color: "#5874b0",
                backgroundColor: "#90bdef",
            }
        }
    },
    avatarCont: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    paper: {
        position: 'fixed',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        display: "flex",
        width: "calc(100% - 700px)",
        height: 270,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 50,
        alignItems: "flex-end",
        justifyContent: "space-between",
        "& div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        "& p": {
            fontWeight: "bold",
            marginBottom: 65
        },
        "& input": {
            marginTop: 10
        }
    },
    modalAvatar: {
        width: 120,
        height: 125,
        marginBottom: 5,
        overflow: "hidden"
    },
    btn: {
        backgroundColor: "#04a9f5 !important",
        color: '#fff'
    },
    uploadBtn: {
        backgroundColor: "#04a9f5",
        border: "1px solid #04a9f5",
        height: 40,
        width: 150,
        borderRadius: 3,
        color: "#fff",
        textAlign: "center",
        cursor: "pointer",
        "&:hover": {
            color: "#3f51b5",
            backgroundColor: "#fff",
        }
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FirstStep));