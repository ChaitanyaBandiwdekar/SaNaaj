import React, { Component } from "react";
import Sanaaj from "../contracts/Sanaaj.json";
import getWeb3 from "../getWeb3";
import * as MUI from '@mui/material';
import "../App.css";
import logo from '../assets/images/logo.png'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
class Header extends Component{
    render(){
        return(
            // <div className="header" style={{backgroundColor: "#351E10"}}>
            //     <h3><img src={logo} height="30"></img> SaNaaj</h3>


            // </div>
            <div className="header">
                <AppBar position="static" style={{backgroundColor: "#351E10"}}>
        <Toolbar>
        <Button color="inherit" height="20"><img src={logo} height="50"></img></Button>
          {/*Inside the IconButton, we 
           can render various icons*/}
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }} style={{color: "#DDAA00", fontSize: 25, fontFamily: 'Montserrat'}}>
            SaNaaj - Samaaj Ka Anaaj
          </Typography>
          {/* <Button color="inherit" height="20"><img src={logo} height="50"></img></Button> */}
          
        </Toolbar>
      </AppBar>
            </div>
        );

    }

}
export default Header;