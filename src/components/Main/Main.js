import React, {Component} from 'react';
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import ProtectedRoute from "../registration/ProtectedRoute";
import {Route, Switch} from "react-router-dom";
import SignUp from "../registration/SignUp/SignUp";
import SignIn from "../registration/SingIn/SignInPage";
import Profile from "../Profile/Profile";

export default class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Header/>
                <div>
                    <hr/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/signin" component={SignIn}/>

                    <Switch>
                        <ProtectedRoute exact path="/questions" component={QuestionPage}/>
                        <ProtectedRoute exact path="/profile" component={Profile}/>
                        <ProtectedRoute exact path="/" component={Main}/>
                    </Switch>
                </div>
            </div>

        )
    }
}
