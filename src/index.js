import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import initFirebase from "./firebase/fireConfig";
import './styles/index.scss';
import './styles/reset.scss';
import initStore from "./redux/store"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom";

initFirebase();

ReactDOM.render(<Router><Provider store={initStore()}><App/></Provider></Router>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
