import React, { Component } from "react";
import Sanaaj from "../contracts/Sanaaj.json";
import getWeb3 from "../getWeb3";
import * as MUI from '@mui/material';
import "../App.css";

class Login extends Component {
    render() {
        return(
            <div className="Login">
            <h1>Welcome to SaNaaj</h1>
            <h2>Login</h2>
            <MUI.Card variant="outlined" sx={{width: 500, height: 250}}>
            <form action="">
                <MUI.TextField size="small" id="outlined-basic" label="Ration card number" variant="outlined" /> 
                <br />
                <br />
                <MUI.TextField size="small" id="outlined-basic" label="Password" variant="outlined" />
            </form>
            </MUI.Card>
            </div>
        );
    }
}

export default Login;