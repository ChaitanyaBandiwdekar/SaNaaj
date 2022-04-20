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

function ConsumerHome(props) {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [passErr, setPassErr] = useState(false);
    const [addrErr, setAddrErr] = useState(false);
    const [allowance, setAllowance] = useState({});
    const [transactions, setTransactions] = useState({});
    const [transactionlist, setTransactionlist] = useState([]);
    const [consumer, setConsumer] = useState([]);
    const theme = createTheme();
    const location = useLocation();
    // const state1 = location.state;
    console.log(location.state.id);
    
    let navigate = useNavigate();
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
      const consumerId=location.state.id
      // const consumerId=props.consumerId;
      const allowance1 = await instance.methods.getAllowance(consumerId).call();
      console.log(allowance1);
      setAllowance(allowance1);
      console.log(allowance);
      const consumer1=await instance.methods.getConsumer(consumerId).call();
      setConsumer(consumer1)
      console.log(consumer1)
      const transaction1 = await instance.methods.getTransactions(consumerId).call();
      console.log(transaction1);
      setTransactions(transaction1);
      const formattedTasks = [];

      const tasks = Object.values(transaction1);


      console.log(transactions);
      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
      }));
      const list = transaction1.map((transaction,index) =>
      // <ListItem alignItems="flex-start"  key={transaction[0]} sx={{ width: '100%', fontSize: 20}}>
        
          /* <ListItem>Quantity:
            <List>
              <ListItem>Rice: {transaction[2][0]}</ListItem>
              <ListItem>Wheat: {transaction[2][1]}</ListItem>
              <ListItem>Sugar: {transaction[2][2]}</ListItem>
              <ListItem>Kerosene: {transaction[2][3]}</ListItem>
            </List>
          </ListItem>
          <ListItem>Time: {transaction[3]}</ListItem>
        </List>
        {transaction}
    </ListItem> */
    
                            /* <ListItemText
                              primary={<h6> Transaction Number:  {index+1}</h6> }
                              secondary={
                                <List>
              <ListItem>
                Rice: {transaction[2][0]}</ListItem>
              <ListItem>Wheat: {transaction[2][1]}</ListItem>
              <ListItem>Sugar: {transaction[2][2]}</ListItem>
              <ListItem>Kerosene: {transaction[2][3]}</ListItem>
              <ListItem>Time: {transaction[3]}</ListItem>
              <hr></hr>
            </List>
            </ListItem> */
            <Card sx={{ minWidth: 275, padding: 1, margin: 1, backgroundColor:"#DDAA00"}}>
              <CardContent>
              <Grid container spacing={1} columns={16} style={{fontFamily: 'Montserrat'}}>
        <Grid item xs={8}>
          
            <h5 style={{backgoundColor: "#DDAA00"}}>Transaction : {index+1}</h5>
          
          
        </Grid>
        <Grid item xs={7}>
        <h5 style={{backgoundColor: "#DDAA00"}}>Time: {transaction[3]}</h5>
        </Grid>
      </Grid>
      <h6>Quantity </h6>
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
            </Grid>
              </CardContent>
              
            
          </Card>
          
           
          
                                

                          
     )
    setTransactionlist(list)


      

    });
  
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
                              <BadgeIcon sx={{ position: 'relative', top: 5}}/> {consumer[2]} {consumer[3]} <br></br> <br></br>
                              <CreditCardIcon sx={{ position: 'relative', top: 5}}/> {consumer[0]} <br></br> <br></br>
                              <PhoneIcon sx={{ position: 'relative', top: 5}}/> {consumer[4]} <br></br> <br></br>
                              <HomeIcon sx={{ position: 'relative', top: 5}}/> {consumer[5]} <br></br> <br></br>
                          </CardContent>
                        </Card>
                        
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
                        {transactionlist}
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
                            <p style={{justifyContent:'center',display: 'flex',align: 'center',alignItems: 'center',flexWrap: 'wrap',color: "#351E10", fontSize: 20, fontWeight:"bold"}}> <AccountCircleIcon style={{fontSize:30, }}></AccountCircleIcon>My Allowance</p>
                              <br></br><hr></hr><br></br>
                              <BadgeIcon sx={{ position: 'relative', top: 5}}/>  Rice: {allowance[0]} <br></br> <br></br>
                              <CreditCardIcon sx={{ position: 'relative', top: 5}}/>Wheat: {allowance[1]} <br></br> <br></br>
                              <PhoneIcon sx={{ position: 'relative', top: 5}}/>  Sugar: {allowance[2]} <br></br> <br></br>
                              <HomeIcon sx={{ position: 'relative', top: 5}}/> Kerosene:  {allowance[3]}<br></br> <br></br>
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
      </div>
    );
  }
  
export default ConsumerHome;