import React, { Component } from "react";
import SignOutButton from "../registration/SignOut/SignOut";
import {connect} from "react-redux";

class QuestionPage extends Component {

    render() {
        return (
            <div>
                <h1>Welcome to Questions Page</h1>
                <SignOutButton/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

export default connect(mapStateToProps)(QuestionPage);