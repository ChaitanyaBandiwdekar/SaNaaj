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
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Card, CardActionArea, CardMedia, CardContent, Grid  } from "@mui/material";
import { useState, useEffect } from 'react';
import Sanaaj from "../../contracts/Sanaaj.json";
import getWeb3 from "../../getWeb3";
import VendorLogin from './VendorLogin';
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
import CancelIcon from '@mui/icons-material/Cancel';
import GrainIcon from '@mui/icons-material/Grain';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import GrassIcon from '@mui/icons-material/Grass';
import GradingIcon from '@mui/icons-material/Grading';
import PeopleIcon from '@mui/icons-material/People';
import Modal from '@mui/material/Modal';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

function VendorHome(props) {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [consumers, setConsumers] = useState([]);
    const [passErr, setPassErr] = useState(false);
    const [addrErr, setAddrErr] = useState(false);
    const [stock, setStock] = useState({});
    // const [isBlacklisted, setIsblacklisted] =useState(null);
    const [transactions, setTransactions] = useState({});
    const [consumerlist, setConsumerlist] = useState([]);
    const [vendor, setVendor] = useState([]);
    const theme = createTheme();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const state1 = location.state;
    console.log(location.state.id);
    
    let navigate = useNavigate();

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

    function getBlacklisted(isBlacklisted){
      if(isBlacklisted){
        return "Yes";
      }
      else{
        return "No";
      }
    };

    const handleUpdate= async (event)=>{
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const cid1=data.get('cid');
      const vid1=parseInt(location.state.id);
      const rice1=parseInt(data.get('rice'));
      const wheat1=parseInt(data.get('wheat'));
      const sugar1=parseInt(data.get('sugar'));
      const kerosene1=parseInt(data.get('kerosene'));
      const commodity = [rice1,wheat1,sugar1,kerosene1]
      console.log(contract);
      await contract.methods.updateAllowance(cid1,vid1,commodity,Date().toLocaleString()).send({from: accounts[0]})
      alert("Allowance Updated!");
      console.log('We here');
      
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    }));

    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
      console.log('hello');
      console.log('hello1')
  
      const web3 = await getWeb3();
      console.log(web3)
      console.log('hello2')
  
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
  
      const deployedNetwork = Sanaaj.networks[networkId];
      const instance = new web3.eth.Contract(
        Sanaaj.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log('Instance found');
      // setState({ web3, accounts, contract: instance });
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      console.log(instance);
      const vendorId=location.state.id
      console.log(typeof(vendorId));
      // const consumerId=props.consumerId;
      const stock1 = await instance.methods.getStock(vendorId).call();
      console.log(stock1);
      setStock(stock1);
      console.log(stock1);
      const vendor1=await instance.methods.getVendor(vendorId).call();
      setVendor(vendor1)
      console.log(vendor1)
      let allconsumers = await instance.methods.getAllConsumers().call();
      console.log(allconsumers);
      let list = []
      // setIsblacklisted(vendor1[6]);
      // console.log(vendor1[6]);
      
      // allconsumers=allconsumers.filter(async (consumer)=>{
      //   let c = await instance.methods.getConsumer(consumer).call();
      //   return c[6]==vendorId;
      // });

      allconsumers.forEach( async (element) => {
        let c = await instance.methods.getConsumer(element).call();
        if(c[6]===vendorId){
          await list.push(c);
        }
      });

      
      setTimeout(() => {
        const list1 = list.map((consumer,index) =>
        <div>
            <Card sx={{ minWidth: 275, padding: 1, margin: 1, backgroundColor:"#DDAA00"}}>
              <CardContent>
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
      {/* <h6>Quantity </h6>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Item><h6>Rice: {transaction[2][0]}</h6></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><h6>Wheat: {transaction[2][1]}</h6></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><h6>Sugar: {transaction[2][2]}</h6></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><h6>Kerosene: {transaction[2][3]}</h6></Item>
                              </Grid>
                              </Grid>*/} 
              </CardContent>
              
            
          </Card> 
          {/* <Button sx={{justifyContent:"center"}} fullWidth onClick={handleOpen}>Open modal</Button>    */}
          <hr></hr>
          </div>  
                          
     )
     console.log(list1);
     setConsumerlist(list1)
      }, 1000);
      console.log(list);
      setConsumers(list);

      

      
    

      
    });

    
  
    return (
      <div>
        <BlockUi tag="div" backgroundColor="black" blocking={vendor[6]} message="This account has been blacklisted. Contact authority@sanaaj.com for further information." color="black">
        <br></br> 
        <br></br>
         <Grid
                container
                direction="row"
                justify="evenly"
                justifyContent="space-evenly"
                alignItems="stretch"
                
                style={{  width: '100%', gap: 0, padding:0, margin:0, height: '100%' }}
            >
                
                    <Grid item xs={12} sm={3} key={1} padding={0}  >
                    <Box sx={{ padding: 1, width: 1,  height:'80vh' }}>
                   
                        <div>
                          
                        
                        {/* <IconButton ><AccountCircleIcon style={{color:"#351E10", fontSize:90}}></AccountCircleIcon> </IconButton> */}
                        {/* <Typography gutterBottom variant="h5" component="div" style={{display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 25, fontWeight:"bold"}}>
                        <AccountCircleIcon style={{fontSize:30, }}></AccountCircleIcon>My Profile
                        </Typography> */}
                        
                        <Card sx={{ minWidth: 275, backgroundColor:'whitesmoke', "&:hover":{backgroundColor: "white"},margin: 1, textAlign: 'left',borderRadius:2}}>
                          <CardContent>
                            <p style={{justifyContent:'center',display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 20, fontWeight:"bold"}}> <AccountCircleIcon style={{fontSize:30, }}></AccountCircleIcon>My Profile</p>
                              <br></br><hr></hr><br></br>
                              <BadgeIcon sx={{ position: 'relative', top: 5}}/> {vendor[1]} {vendor[2]} <br></br> <br></br>
                              <CreditCardIcon sx={{ position: 'relative', top: 5}}/> {vendor[0]} <br></br> <br></br>
                              <PhoneIcon sx={{ position: 'relative', top: 5}}/> {vendor[3]} <br></br> <br></br>
                              <HomeIcon sx={{ position: 'relative', top: 5}}/> {vendor[4]} <br></br> <br></br>
                              <CancelIcon sx={{ position: 'relative', top: 5}}/> Blacklisted - {getBlacklisted(vendor[6])} <br></br> <br></br>
                          </CardContent>
                        </Card>                        
                      <Button sx={{justifyContent:"center"}} style={{backgroundColor:"#351E10", color: "#DDAA00",}} fullWidth onClick={handleOpen}>Update Allowance</Button>
                        
                        </div>
                   
                </Box>
                    
                    
                     </Grid>

                     <Grid item xs={12} sm={5} key={2} >
                     <Box sx={{borderRadius:2,  height:'80vh'}}>
                    
                        <div>
                        <Card sx={{ minWidth: 275 ,backgroundColor:'whitesmoke', "&:hover":{backgroundColor: "white"},margin: 1, textAlign: 'left',borderRadius:2}}>
                          <CardContent>
                            <p style={{justifyContent:'center',display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 20, fontWeight:"bold"}}> <PeopleIcon style={{fontSize:30, }}></PeopleIcon>My Consumers</p>
                              <br></br><hr></hr><br></br>
                              <List sx={{ width: '100%', maxHeight: 530, overflowY: 'scroll' }} className="scroll">
                        {consumerlist}
                              </List>
                              </CardContent>
                              </Card>
                       
                        
                        
                        </div>
                    
                </Box>
                     
                     </Grid>
                     <Modal
                      backgroundColor="#000000"
                        open={open}
                        onClose={handleClose}
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
                          
                          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
                            <Typography>Update Consumer Allowance:</Typography>
                            <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="cid"
                                  label="Consumer Ration ID"
                                  name="cid"                              
                                  autoFocus
                                />
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                              <Grid item xs={6}>
                                <Item><TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="rice"
                                  label="Rice"
                                  name="rice"                              
                                  autoFocus
                                /></Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item><TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="wheat"
                                  label="Wheat"
                                  name="wheat"                              
                                  autoFocus
                                /></Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item><TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="sugar"
                                  label="Sugar"
                                  name="sugar"                              
                                  autoFocus
                                /></Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item><TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="kerosene"
                                  label="Kerosene"
                                  name="kerosene"                              
                                  autoFocus
                                /></Item>
                              </Grid>
                            </Grid>                  
                                                      
                            
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

                     <Grid item xs={12} sm={3} key={3} >
                     <Box sx={{  width: 1,  height:'80vh' , borderRadius:5}}>
                   
                        <div>
                        <Card sx={{ minWidth: 275, backgroundColor:'whitesmoke', "&:hover":{backgroundColor: "white"},margin: 1, textAlign: 'left',borderRadius:2}}>
                          <CardContent>
                            <p style={{justifyContent:'center',display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 20, fontWeight:"bold"}}> <GradingIcon style={{fontSize:30, }}></GradingIcon>Current Stock</p>
                              <br></br><hr></hr><br></br>
                              <GrainIcon sx={{ position: 'relative', top: 5}}/>  Rice: {stock[0]} <br></br> <br></br>
                              <GrassIcon sx={{ position: 'relative', top: 5}}/>Wheat: {stock[1]} <br></br> <br></br>
                              <HourglassBottomIcon sx={{ position: 'relative', top: 5}}/>  Sugar: {stock[2]} <br></br> <br></br>
                              <SanitizerIcon sx={{ position: 'relative', top: 5}}/> Kerosene:  {stock[3]}<br></br> <br></br>
                              </CardContent>
                              </Card>

                             
                        {/* <IconButton ><AccountCircleIcon style={{color:"#351E10", fontSize:90}}></AccountCircleIcon> </IconButton> */}
                        {/* <Typography gutterBottom variant="h5" component="div" style={{color: "#351E10", fontSize: 25, fontWeight:"bold"}}>
                        Allowance
                        

                        </Typography> */}
                        {/* <List sx={{ width: '100%'}}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Rice"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Quantity: {allowance[0]}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <hr></hr> */}
                          {/* <Divider variant="inset" component="li" /> */}
                          {/* <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Wheat"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Quantity: {allowance[1]}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <hr></hr>
                          
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Sugar"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Quantity: {allowance[2]}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <hr></hr>
                          
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Kerosene"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Quantity: {allowance[3]}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <hr></hr>
                        </List>
                         */}
                        </div>
                   
                </Box>
                     
                     </Grid>
                
            </Grid>
            </BlockUi>
      </div>
    );
  }
  
export default VendorHome;