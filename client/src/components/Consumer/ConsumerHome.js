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
import ConsumerLogin from './ConsumerLogin';
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
import GradingIcon from '@mui/icons-material/Grading';
import GrainIcon from '@mui/icons-material/Grain';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import GrassIcon from '@mui/icons-material/Grass';
import {db} from '../../Firebase'
import {collection, addDoc, doc, getDoc, where, onSnapshot, query } from 'firebase/firestore'

function ConsumerHome(props) {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [passErr, setPassErr] = useState(false);
    const [addrErr, setAddrErr] = useState(false);
    const [allowance, setAllowance] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [transactionlist, setTransactionlist] = useState([]);
    const [consumer, setConsumer] = useState([]);
   
    const [color, setColor] = useState("black");
    const [colorname, setColorname] = useState("black");
    const [complaint,setComplaint]=useState("")
    const theme = createTheme();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      
    });
  };

  function getCurrentDateTime(){
    const locale = 'en';
    const today = new Date();
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}`;

    const hour = today.getHours();

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    const retString = date.concat(", ",time);
    // console.log(day);
    return retString;
  };

  const handleComplain= async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const complaint1=data.get('complaint');
    console.log(contract);
    // await contract.methods.addComplaint(consumer[0],consumer[6],complaint1,getCurrentDateTime()).send({from: accounts[0]})
    try {
      await addDoc(collection(db, 'complaint'), {
        ration_id: consumer[0],
        vendor_id: consumer[6],
        complaint_content: complaint1,
        time: getCurrentDateTime()
      })
      alert("Your complaint is submitted.")
      console.log('We here')
    handleClose()
    } catch (err) {
      alert(err)
    }
    alert("Your complaint is submitted.");
    console.log('We here');
    // handleClose();
    
    
  }
  const handleLogout=(event)=>{
    return navigate("/");
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
    // const state1 = location.state;
    // console.log(location.state.id);
    
    let navigate = useNavigate();
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
      if(location.state == null){
        navigate('/login-consumer');
      }
      const reloadCount = sessionStorage.getItem('reloadCount');
      if(reloadCount < 2) {
        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        window.location.reload();
      } else {
        sessionStorage.removeItem('reloadCount');
      }
      console.log('hello');
      console.log('hello1')
  
      const web3 = await getWeb3();
      console.log(web3)
      // console.log('hello2')
  
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
      const consumerId=location.state.id
      // const allowance1 = await instance.methods.getAllowance(consumerId).call();
      // setAllowance(allowance1);

      const consumerDocRef = doc(db, "consumer", consumerId);
      const consumerdocSnap = await getDoc(consumerDocRef);

      let consumer1;
      if (consumerdocSnap.exists()) {
        consumer1 = consumerdocSnap.data();
        console.log(consumer1);
      }
      const allowanceDocRef = doc(db, "allowance", consumerId);
      const allowancedocSnap = await getDoc(allowanceDocRef);

      let allowance1;
      if (allowancedocSnap.exists()) {
        allowance1 = allowancedocSnap.data();
        console.log(allowance1);
      }

      // const consumer1=await instance.methods.getConsumer(consumerId).call();
      setConsumer(consumer1)
      setAllowance(allowance1)
      // const transaction1 = await instance.methods.getTransactions(consumerId).call();
      
      const q = query(collection(db, 'transaction'), where("consumer_id", "==", consumerId))
        onSnapshot(q, (querySnapshot) => {
          setTransactions(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        });
        
      const cardtype= consumer1[1];
      console.log(consumer1[1])
      const c=setColor("blue");
      console.log(c);
      if (cardtype==1) {
        setColor("orange");
        setColorname("saffron")
        
      } 
      else if(cardtype==2) {
        setColor("white");
        setColorname("white");
      }
      else{
        setColor("green");
        setColorname("green");
       
      }
    
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    }));
  
    // const handleSubmit = async (event) => {
    //       event.preventDefault();
    //       // const { contract, accounts } = this.state;
    //       // this.setState({ web3, accounts, contract: instance }, this.runExample);
    //       const data = new FormData(event.currentTarget);
    //       console.log({
    //         ration: data.get('id'),
    //         password: data.get('password'),
    //       });
    //       console.log(typeof(data.get("id")));
          
    //       // await contract.methods.updateAllowance(data.get('id'), 1, [1, 1, 0, 1], Date().toLocaleString()).send({from: accounts[0]});
    //       // const transactions = await contract.methods.getTransactions(data.get("id")).call();
    //       // console.log(vendor);
    //       // console.log(transactions);
      
    //       console.log(vendor[5]);
      
    //       // let navigate = useNavigate();
      
    //       if(data.get('password') == vendor[5]){
    //         setPassErr(false);
    //         if(vendor[7] == accounts[0]){
  
    //           setAddrErr(false);
    //           // this.navigate('/consumer-home');
    //           console.log("GG");
    //           navigate('/vendor-home');
    //           // this.props.history.push("/login-consumer");
    //           // return <Navigate replace={true} to="/consumer-home" />
    //           // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
    //           // window.location.href='/consumer-home';
            
    //         }
    //         else{
    //           console.log("Incorrect wallet address");
    //           // navigate('/login-consumer');
    //           setAddrErr(true);
    //           // navigate.push('/login-consumer');
    //           // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
    //         }
    //       }
    //       else{
    //         console.log("Incorrect password");
    //         // navigate('/login-consumer');
    //         setPassErr(true);
    //         // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
    //       }
          
    //     };
  
    return (
      <div>
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
                              <BadgeIcon sx={{ position: 'relative', top: 5}}/> {consumer.first_name} {consumer.last_name} <br></br> <br></br>
                              <CreditCardIcon sx={{ position: 'relative', top: 5}}/> {consumer.ration_card} <br></br> <br></br>
                              <PhoneIcon sx={{ position: 'relative', top: 5}}/> {consumer.phone} <br></br> <br></br>
                              <HomeIcon sx={{ position: 'relative', top: 5}}/> {consumer.location} <br></br> <br></br>
                          </CardContent>
                        </Card>
                        
                        </div>
                        
                        <div>
                          
                          <Button sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:color }} style={{color:"white", backgroundColor:color, borderColor:"#351E10"}} fullWidth>Ration Card Type: {colorname}</Button>
                          <br></br><br></br>
      <Button  onClick={handleOpen} sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#351E10", "&:hover":{backgroundColor: "#351E10", boxShadow:9, borderColor:'white' } }} fullWidth>File a Complain</Button>
      <Button  sx={{ border: 1,borderColor: '#351E10', color:"white", backgroundColor:"#991B16", "&:hover":{backgroundColor: "#8B0000", boxShadow:9, borderColor:'white' }, marginTop:3 }} fullWidth onClick={handleLogout}>Logout</Button>
      
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
          
          <Box component="form" onSubmit={handleComplain} noValidate sx={{ mt: 1 }}>
            <Typography>File Your Complain Now!</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="complaint"
              label="Your Complain"
              name="complaint"
              onChange={setComplaint}
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
    </div>
                   
                </Box>
                    
                    
                     </Grid>

                     <Grid item xs={12} sm={5} key={2} >
                     <Box sx={{borderRadius:2,  height:'80vh'}}>
                    
                        <div>
                        <Card sx={{ minWidth: 275 ,backgroundColor:'whitesmoke', "&:hover":{backgroundColor: "white"},margin: 1, textAlign: 'left',borderRadius:2}}>
                          <CardContent>
                            <p style={{justifyContent:'center',display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 20, fontWeight:"bold"}}> <ReceiptLongIcon style={{fontSize:30, }}></ReceiptLongIcon>My Transactions</p>
                              <br></br><hr></hr><br></br>
                              <List sx={{ width: '100%', maxHeight: 530, overflowY: 'scroll' }} className="scroll">
                                            {transactions.map((transaction,index) =>
                                <Card sx={{ minWidth: 275, padding: 1, margin: 1, backgroundColor:"#DDAA00"}}>
                                  <CardContent>
                                  <Grid container spacing={1} columns={16} style={{fontFamily: 'Montserrat'}}>
                            <Grid item xs={8}>
                              
                                <h5 style={{backgoundColor: "#DDAA00"}}>Transaction : {index+1}</h5>
                              
                              
                            </Grid>
                            <Grid item xs={7}>
                            <h5 style={{backgoundColor: "#DDAA00"}}>Time: {transaction.data.time}</h5>
                            </Grid>
                          </Grid>
                          <br/>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                  <Grid item xs={6}>
                                    <Item><h5>Rice: {transaction.data.rice}</h5></Item>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Item><h5>Wheat: {transaction.data.wheat}</h5></Item>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Item><h5>Sugar: {transaction.data.sugar}</h5></Item>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Item><h5>Kerosene: {transaction.data.kerosene}</h5></Item>
                                  </Grid>
                                </Grid>
                                  </CardContent>
                                  
                                
                              </Card>)}
                              </List>
                              </CardContent>
                              </Card>
                       
                        
                        
                        </div>
                    
                </Box>
                     
                     </Grid>

                     <Grid item xs={12} sm={3} key={3} >
                     <Box sx={{  width: 1,  height:'80vh' , borderRadius:5}}>
                   
                        <div>
                        <Card sx={{ minWidth: 275, backgroundColor:'whitesmoke', "&:hover":{backgroundColor: "white"},margin: 1, textAlign: 'left',borderRadius:2}}>
                          <CardContent>
                            <p style={{justifyContent:'center',display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 20, fontWeight:"bold"}}> <GradingIcon style={{fontSize:30, }}></GradingIcon>My Allowance</p>
                              <br></br><hr></hr><br></br>
                              <GrainIcon sx={{ position: 'relative', top: 5}}/>  Rice: {allowance.rice} <br></br> <br></br>
                              <GrassIcon sx={{ position: 'relative', top: 5}}/>Wheat: {allowance.wheat} <br></br> <br></br>
                              <HourglassBottomIcon sx={{ position: 'relative', top: 5}}/>  Sugar: {allowance.sugar} <br></br> <br></br>
                              <SanitizerIcon sx={{ position: 'relative', top: 5}}/> Kerosene:  {allowance.kerosene}<br></br> <br></br>
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
            <Footer/>
      </div>
    );
  }
  
export default ConsumerHome;