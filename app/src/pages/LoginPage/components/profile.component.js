import React, {Component, useEffect, useState} from "react";
import AuthService from "../../../services/auth.service";
import axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            accessToken: AuthService.getToken()
        };
    }

    render() {
        const { currentUser } = this.state;
        console.log(this.state.currentUser);
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.data.username}</strong> Profile

                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {this.state.accessToken} ...{" "}
                    {/*{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
                </p>
                <p>
                    <strong>Username:</strong>{" "}
                    {currentUser.username}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}