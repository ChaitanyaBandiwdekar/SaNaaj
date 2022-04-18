import React, { Component } from "react";
import Sanaaj from "../contracts/Sanaaj.json";
import getWeb3 from "../getWeb3";
import * as MUI from '@mui/material';
import "../App.css";
import { Typography } from "@mui/material";
import { Card, CardActionArea, CardMedia, CardContent, Grid  } from "@mui/material";
import consumer from '../assets/images/consumer1.png'
import vendor from '../assets/images/vendor.png'
import authority from '../assets/images/authority.png'
import { Link } from "react-router-dom";
import { height } from "@mui/system";
import shadows from "@mui/material/styles/shadows";
import Header from "./Header";
import Footer from "./Footer";

class Landing extends Component {
    render() {
        return(
            <div className="Landing" >
                <Header/><br></br>
                
                
                <Grid
                container
                direction="row"
                justify="center"
                justifyContent="space-evenly"
                alignItems="center"
                
                style={{  maxWidth: '100%' }}
            >
                
                    <Grid item xs={12} sm={6} md={3} key={1}  >
                    <Link to="/login-consumer" state={{ name: "Consumer", id: "Ration card Id", reload: true }} style={{ textDecoration: 'none' }}>
                
                        <Card sx={{  backgroundColor:'#FFF7E7', "&:hover":{backgroundColor: "white"},  height:500 , borderRadius:5}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="80%"
                        image={consumer}
                        alt="green iguana"
                        backgroundColor="#A65111"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" style={{color: "#351E10", fontSize: 25, fontWeight:"bold"}}>
                        Login As Consumer
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                </Card>
                
                </Link>
                     </Grid>

                     <Grid item xs={12} sm={6} md={3} key={2} >
                     <Link to="/login-vendor" state={{ name: "Vendor", id: "Vendor Id" }} style={{ textDecoration: 'none' }}>
                        <Card sx={{ backgroundColor:'#FFF7E7', "&:hover":{backgroundColor:'white'} , height:500, borderRadius:5}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="80%"
                        image={vendor}
                        alt="green iguana"
                        backgroundColor="#A65111"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" pt={4}  style={{color: "#351E10", fontSize: 25, fontWeight:"bold"}}>
                        Login As Vendor
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                </Card>
                </Link>
                     </Grid>

                     <Grid item xs={12} sm={6} md={3} key={3} >
                     <Link to="/login-authority" state={{ name: "Admin" }} style={{ textDecoration: 'none' }} >
                        <Card sx={{  backgroundColor:'#FFF7E7', "&:hover":{backgroundColor:'white'} ,  height:500, borderRadius:5}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="80%"
                        image={authority}
                        alt="green iguana"
                        backgroundColor="#A65111"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div"  pt={1}  style={{color: "#351E10", fontSize: 25, fontWeight:"bold"}}>
                        Login As Authority
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                </Card>
                </Link>
                     </Grid>
                
            </Grid>
            <Footer/>
            </div>
        );
    }
}

export default Landing;