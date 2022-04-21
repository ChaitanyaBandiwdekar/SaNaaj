import * as React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import Footer from '../Footer';
import logo from '../../assets/images/logo.png'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Card, CardActionArea, CardMedia, CardContent, Grid  } from "@mui/material";
import { useState, useEffect } from 'react';
import Sanaaj from "../../contracts/Sanaaj.json";
import getWeb3 from "../../getWeb3";
import { useLocation, useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function AuthorityHome() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [consumerList, setConsumerList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  function getColor(cardType){
    if(cardType==='0'){
      return "Saffron";
    }
    else if(cardType==='1'){
      return "White";
    }
    else{
      return "Yellow";
    }
  };

  useEffect(async () => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }

    const web3 = await getWeb3();
  
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
  
    const deployedNetwork = Sanaaj.networks[networkId];
    const instance = new web3.eth.Contract(
      Sanaaj.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setWeb3(web3);
    setAccounts(accounts);
    setContract(instance);

    let allconsumers = await instance.methods.getAllConsumers().call();
    let allvendors = await instance.methods.getAllVendors().call();
    let list = []
    let vlist = []

    allconsumers.forEach(async (element) => {
      let c = await instance.methods.getConsumer(element).call();
      list.push(c);
    });

    allvendors.forEach(async (element) => {
      let v = await instance.methods.getVendor(element).call();
      vlist.push(v);
    });

    setTimeout(() => {
      console.log(vlist);
      const list1 = list.map((consumer,index) =>
        <div>
            <Card sx={{ minWidth: 275, padding: 1, margin: 1, backgroundColor:"#DDAA00"}}>
              <CardContent sx={{paddingX: 0 }}>
              <Grid container spacing={1} columns={16} style={{fontFamily: 'Montserrat'}}>
                  <Grid item xs={8}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Name : {consumer[2]} {consumer[3]}</h5>
                  </Grid>
                  <Grid item xs={8}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>ConsumerId : {consumer[0]}</h5>
                  </Grid>
                  <Grid item xs={7}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>CardType: {getColor(consumer[1])}</h5>
                  </Grid>
                  <Grid item xs={7}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Phone: {consumer[4]}</h5>
                  </Grid>
                </Grid>
              </CardContent>
          </Card> 
          <hr></hr>
          </div>                    
     );

     const list2 = vlist.map((vendor,index) =>
        <div>
            <Card sx={{ minWidth: 275, padding: 1, margin: 1, backgroundColor:"#DDAA00"}}>
              <CardContent sx={{paddingX: 0 }}>
              <Grid container spacing={1} columns={16} style={{fontFamily: 'Montserrat'}}>
                  <Grid item xs={8}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Name : {vendor[1]} {vendor[2]}</h5>
                  </Grid>
                  <Grid item xs={8}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>VendorId : {vendor[0]}</h5>
                  </Grid>
                  {/* <Grid item xs={7}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>CardType: {getColor(consumer[1])}</h5>
                  </Grid> */}
                  <Grid item xs={7}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Phone: {vendor[3]}</h5>
                  </Grid>
                  <Grid item xs={7}>
                  {/* <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"black", fontSize: 'small' }} onClick={() => toggleBlacklist(vendor)}>{vendor[6] ? 'Unblacklist': 'Blacklist'} </Button> */}
                  </Grid>
                </Grid>
              </CardContent>
          </Card> 
          <hr></hr>
          </div>                    
     );

     setConsumerList(list1);
     setVendorList(list2);
    }, 500);
  }, []);

  // const toggleBlacklist = async function (vendor) {
  //   await contract.methods.blackList(vendor[0]).send({from: accounts[0]});
  // }


    return(
        <div>
            <br></br>
            <Box sx={{ width: '95%', padding: 1 }}>
      <Grid
      container
                direction="row"
                justify="evenly"
                justifyContent="space-around"
                alignItems="stretch"
                style={{  width: '100%', gap: 0, padding:0, margin:0, height: '100%' }} >
        <Grid item xs={5} >
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 24 }}  style={{color: "#351E10", fontSize: 20, fontWeight:"bold"}} gutterBottom>
                Consumer List
              </Typography>
              <List sx={{ maxHeight: '65vh', overflowY: 'scroll'}} className="scroll">
                {consumerList}
              </List>
              
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 24 }}  style={{color: "#351E10", fontSize: 20, fontWeight:"bold"}} gutterBottom>
                Vendor List
              </Typography>
              <List sx={{ maxHeight: '65vh', overflowY: 'scroll'}} className="scroll">
                {vendorList}
              </List>
              
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"black" }} fullWidth>Add Consumer</Button>
          <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"black", marginTop: 3 }} fullWidth>Add Vendor</Button>
          <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"black", marginTop: 3 }} fullWidth>View Complains</Button>
        </Grid>
        
      </Grid>
    </Box>
        </div>
    );
   
    } 
export default AuthorityHome;