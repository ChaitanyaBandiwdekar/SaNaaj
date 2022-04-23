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
import { Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const [complaitList,setComplaitList]=useState([])
  const[allcomplaintslist,setallcomplaintslist]=useState([]);


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
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleOpen4 = () => setOpen4(true);
  const handleOpen5 = () => setOpen5(true);
  const handleOpen6 = () => setOpen6(true);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const handleClose4 = () => setOpen4(false);
  const handleClose5 = () => setOpen5(false);
  const handleClose6 = () => setOpen6(false);
  const handleAddConsumer= async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const ration_card=event.target.ration_card.value;
    const ration_card_type=parseInt(event.target.ration_card_type.value);
    const first_name=event.target.first_name.value;
    const last_name=event.target.last_name.value
    const phone=event.target.phone.value;
   const location=event.target.location.value;
       const vendor_id=parseInt(event.target.vendor_id.value);
    const password=event.target.password.value; 
       const wallet_addr=event.target.wallet_addr.value;
    console.log(contract);
    console.log(ration_card);
    console.log('here')
    await contract.methods.addConsumer(ration_card,
      ration_card_type,
      first_name,
      last_name,
      phone,
      location,
      vendor_id,
      password,
      wallet_addr).send({from: accounts[0]})
    alert("New Consumer is added");
    console.log('We here'); 
  }
  const handleAddVendor= async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const  isBlacklisted=event.target. isBlacklisted.value;
    const first_name=event.target.first_Name.value;
    const last_name=event.target.last_Name.value
    const phone=event.target.Phone.value;
    const location=event.target.Location.value;
    const vendor_id=parseInt(event.target.vendor_Id.value);
    const password=event.target.Password.value; 
    const wallet_addr=event.target.wallet_Addr.value;
    console.log(contract);
    console.log(vendor_id);
    console.log('here')
    await contract.methods.addVendor(vendor_id,
      first_name,
      last_name,
      phone,
      location,
      password,
      isBlacklisted,
      wallet_addr).send({from: accounts[0]})
    alert("New Vendor is added");
    
    
    
  }
  const handleRefillStock=async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const vendor_id=parseInt(event.target.vid.value);
    await contract.methods.refillStock(vendor_id).send({from: accounts[0]})
    console.log('success')
    alert('Stock updated successfully for vendor!')
  }
  const refillAllowance=async(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const c_id=event.target.cid.value;
    await contract.methods.refillAllowance(c_id).send({from: accounts[0]});
    console.log('success');
    alert('Allowance updated successfully for consumers!');

  }
  const handleBlackList=async(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const v_id=parseInt(event.target.vId.value);
    await contract.methods.blacklist(v_id).send({from: accounts[0]});
    console.log('success');
    alert('Vendor status updated!');

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow:'scroll',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize:12

  };

  let navigate = useNavigate();
  const location = useLocation();
  useEffect(async () => {
    if(location.state == null){
      navigate('/login-authority');
    }

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
    let allcomplaints= await instance.methods.getAllComplaints().call();
    console.log(allcomplaints)
    setComplaitList(allcomplaints);


    allconsumers.forEach(async (element) => {
      let c = await instance.methods.getConsumer(element).call();
      list.push(c);
    });

    allvendors.forEach(async (element) => {
      let v = await instance.methods.getVendor(element).call();
      vlist.push(v);
    });
    function getBlacklisted(isBlacklisted){
      if(isBlacklisted){
        return "Yes";
      }
      else{
        return "No";
      }
    };

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
                  <Grid item xs={8}>
                  {/* <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"black", fontSize: 'small' }} onClick={() => toggleBlacklist(vendor)}>{vendor[6] ? 'Unblacklist': 'Blacklist'} </Button> */}
                  <h5 style={{backgoundColor: "#DDAA00"}}>Blacklisted : {getBlacklisted(vendor[6])}</h5>
                  </Grid>
                </Grid>
              </CardContent>
          </Card> 
          <hr></hr>
          </div>                    
     );
     const list3 = allcomplaints.map((complaint,index) =>
        <div>
            <Card sx={{ minWidth: 275, padding: 1, margin: 1, }}>
              <CardContent sx={{paddingX: 0 }}>
              <Grid container spacing={1} columns={16} style={{fontFamily: 'Montserrat'}}>
              <Grid item fullWidth>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Complain Number : {index+1}</h5>
                  </Grid>
                  <Grid item fullWidth>
                    <h5 style={{backgoundColor: "#DDAA00"}}></h5>
                  </Grid>
                  <Grid item fullWidth>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Ration ID : {complaint[0]}</h5>
                  </Grid>
                  {/* <Grid item fullWidth>
                    <h5 style={{backgoundColor: "#DDAA00"}}>VendorId : {complaint[1]}</h5>
                  </Grid> */}
                  {/* <Grid item xs={7}>
                    <h5 style={{backgoundColor: "#DDAA00"}}>CardType: {getColor(consumer[1])}</h5>
                  </Grid> */}
                  <Grid item fullWidth>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Description: {complaint[2]}</h5>
                  </Grid>
                  <Grid item fullWidth>
                    <h5 style={{backgoundColor: "#DDAA00"}}>Time : {complaint[3]}</h5>
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
     setallcomplaintslist(list3)
    }, 1000);
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
        <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10" }} onClick={handleOpen1} fullWidth>Add Consumer</Button>
      
      <Modal
      backgroundColor="#000000"
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        {/* <Box sx={style}> */}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            File Your Complain
          </Typography> */}
          <Box
          sx={
            // marginTop: 8,
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            style
          }
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          
          <Box component="form" onSubmit={handleAddConsumer} noValidate sx={{ mt: 1 }}>
            <Typography>Add Consumer</Typography>
            <TextField
            
              required
              fullWidth
              id="ration_card"
              label="Ration Card Number"
              name="ration_card,"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ration_card_type"
              label="Ration Card Type-1,2,3"
              name="ration_card_type,"
              
              autoFocus
            />
            <Grid container spacing={2}>
            <Grid item xs={4}>
            <TextField
              
              required
              
              id="first_name"
              label="First Name"
              name="first_name"
              
              autoFocus
            />

            </Grid>
            <Grid item xs={4}>
            <TextField
              
              required
              
              id="last_name"
              label="Last Name"
              name="last_name"
              
              autoFocus
            />

            </Grid>
            </Grid>
            
            
            
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="vendor_id"
              label="Vendor ID"
              name="vendor_id"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="New password for consumer"
              name="password"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="wallet_addr"
              label="Wallet Address for consumer"
              name="wallet_addr"
              
              autoFocus
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
              
            >
              submit
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
          
        {/* </Box> */}
      </Modal>
      <br></br>
      <br></br>
          {/* <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"black" }} fullWidth>Add Consumer</Button> */}
          <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10" }} onClick={handleOpen2} fullWidth>Add Vendor</Button>
          <Modal
      backgroundColor="#000000"
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        {/* <Box sx={style}> */}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            File Your Complain
          </Typography> */}
          <Box
          sx={
            // marginTop: 8,
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            style
          }
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          
          <Box component="form" onSubmit={handleAddVendor} noValidate sx={{ mt: 1 }}>
            <Typography>Add Vendor</Typography>
            <TextField
            
              required
              fullWidth
              id="vendor_Id"
              label="Vendor ID"
              name="vendor_Id"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_Name"
              label="First Name"
              name="first_Name"
              
              autoFocus
            />
            <Grid container spacing={2}>
            <Grid item xs={4}>
            <TextField
              
              required
              
              id="last_Name"
              label="Last Name"
              name="last_Name"
              
              autoFocus
            />

            </Grid>
            <Grid item xs={4}>
            <TextField
              
              required
              
              id="Phone"
              label="Phone Number"
              name="Phone"
              
              autoFocus
            />

            </Grid>
            </Grid>
            
            
            
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="Location"
              label="Location"
              name="Location"
              
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="Password"
              label="Password"
              name="Password"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="isBlacklisted"
              label="Blacklisted(true/false)"
              name="isBlacklisted"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="wallet_Addr"
              label="Wallet Address for Vendor"
              name="wallet_Addr"
              
              autoFocus
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
              
            >
              submit
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
          
        {/* </Box> */}
      </Modal>
          <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10", marginTop: 3 }}onClick={handleOpen3} fullWidth>View Complains</Button>
          <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Complains
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {allcomplaintslist}
            
          </Typography>
        </Box>
      </Modal>
      <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10", marginTop: 3 }}onClick={handleOpen4} fullWidth>Refill Stock</Button>
          <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Refill Stock- Vendor
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {allcomplaintslist}
            
          </Typography> */}
          <Box component="form" onSubmit={handleRefillStock} noValidate sx={{ mt: 1 }}>
                            
                            <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="vid"
                                  label="Vendor ID"
                                  name="vid"                              
                                  autoFocus
                                />
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              
                              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
                              
                            >
                              Submit
                            </Button>
                            <Grid container>
                              <Grid item xs>
                                
                              </Grid>
                              <Grid item>
                              </Grid>
                            </Grid>
                          </Box>
        </Box>
      </Modal>

      <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10", marginTop: 3 }}onClick={handleOpen5} fullWidth>Refill Allowance </Button>
          <Modal
        open={open5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Refill Allowance - Consumer
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {allcomplaintslist}
            
          </Typography> */}
          <Box component="form" onSubmit={refillAllowance} noValidate sx={{ mt: 1 }}>
                            
                            <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="cid"
                                  label="Ration ID"
                                  name="cid"                              
                                  autoFocus
                                />
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              
                              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
                              
                            >
                              Submit
                            </Button>
                            <Grid container>
                              <Grid item xs>
                                
                              </Grid>
                              <Grid item>
                              </Grid>
                            </Grid>
                          </Box>
        </Box>
      </Modal>

      <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10", marginTop: 3 }}onClick={handleOpen6} fullWidth>Toggle Blacklist Vendor </Button>
          <Modal
        open={open6}
        onClose={handleClose6}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Toggle BlackList Vendor
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {allcomplaintslist}
            
          </Typography> */}
          <Box component="form" onSubmit={handleBlackList} noValidate sx={{ mt: 1 }}>
                            
                            <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="vId"
                                  label="Vendor ID"
                                  name="vId"                              
                                  autoFocus
                                />
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              
                              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
                              
                            >
                              Submit
                            </Button>
                            <Grid container>
                              <Grid item xs>
                                
                              </Grid>
                              <Grid item>
                              </Grid>
                            </Grid>
                          </Box>
        </Box>
      </Modal>
      
        </Grid>
        
      </Grid>
    </Box>
        </div>
    );
   
    } 
export default AuthorityHome;