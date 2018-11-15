import React, { Component } from 'react';
import Header from "../../components/Header/Header";
// import NavLoginBtns from '../../components/Header/navButtons/NavLoginBtns/NavLoginBtns';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
import NavQuestionBtns from '../../components/Header/navButtons/NavQuestionBtns/NavQuestionBtns';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            sideDrawerOpen: false
        };

        this.drawerToggleHandler = this.drawerToggleHandler.bind(this);
        this.backdropClickHandler = this.backdropClickHandler.bind(this);
    }
    
    drawerToggleHandler() {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler() {
        this.setState({ sideDrawerOpen: false });
    }

    render() {
        let backdrop;

        (this.state.sideDrawerOpen)
            ? backdrop = <Backdrop click={this.backdropClickHandler} />
            : backdrop = null;

        return (
            <div>
                <Header drawerClickHandler={this.drawerToggleHandler}>
                    <NavQuestionBtns />
                </Header>
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backdrop}
                <main style={{marginTop: "170px"}}>
                    <p>Content Profile</p>
                </main>
            </div>
        );
    }
}