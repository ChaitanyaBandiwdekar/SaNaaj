import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import Footer from '../Footer';
import Sanaaj from "../../contracts/Sanaaj.json";
import getWeb3 from "../../getWeb3";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Modal from '@mui/material/Modal';
require('dotenv').config()

// // function Copyright(props) {
// //   return (
// //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
// //       {'Copyright © '}
// //       <Link color="inherit" href="https://mui.com/">
// //         Your Website
// //       </Link>{' '}
// //       {new Date().getFullYear()}
// //       {'.'}
// //     </Typography>
// //   );
// // }

const theme = createTheme();

// class ConsumerLogin extends React.Component {

//   state = { web3: null, 
//     accounts: null, 
//     contract: null,
//     state1: null
//   };
  
//   componentDidMount = async () => {
//     console.log('hello');
//     console.log('hello1')

//     const web3 = await getWeb3();
//     console.log(web3)
//     console.log('hello2')

//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts)
//     const networkId = await web3.eth.net.getId();

//     const deployedNetwork = Sanaaj.networks[networkId];
//     const instance = new web3.eth.Contract(
//       Sanaaj.abi,
//       deployedNetwork && deployedNetwork.address,
//     );
//     console.log('Instance found');
//     this.setState({ web3, accounts, contract: instance });
//   }

//   navigate = useNavigate();

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { contract, accounts } = this.state;
//     // this.setState({ web3, accounts, contract: instance }, this.runExample);
//     const data = new FormData(event.currentTarget);
//     console.log({
//       ration: data.get('id'),
//       password: data.get('password'),
//     });
//     console.log(typeof(data.get("id")));
//     const consumer = await contract.methods.getConsumer(data.get("id")).call();
//     // await contract.methods.updateAllowance(data.get('id'), 1, [1, 1, 0, 1], Date().toLocaleString()).send({from: accounts[0]});
//     // const transactions = await contract.methods.getTransactions(data.get("id")).call();
//     console.log(consumer);
//     // console.log(transactions);

//     console.log(consumer[7]);

//     // let navigate = useNavigate();

//     if(data.get('password') == consumer[7]){
//       if(consumer[8] == accounts[0]){
//         this.navigate('/consumer-home');
//         // console.log("GG");
//         // navigate.push('/consumer-home');
//         // this.props.history.push("/login-consumer");
//         // return <Navigate replace={true} to="/consumer-home" />
//         // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
//         // window.location.href='/consumer-home';
//       }
//       else{
//         // console.log("Incorrect wallet address");
//         // navigate.push('/login-consumer');
//         // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
//       }
//     }
//     else{
//       // console.log("Incorrect password");
//       // navigate.push('/login-consumer');
//       // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
//     }
    
//   };

  
  
//   render(){ 
//     return (
//     <ThemeProvider theme={theme}>
//       <Header/>
//       <Grid container component="main" sx={{ height: '90vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://images.theconversation.com/files/389530/original/file-20210315-21-ajek7r.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)',
//             backgroundRepeat: 'no-repeat', height:"100%",
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1,  }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" sx={{color:"#351E10", fontWeight:"bold"}}>
//               Consumer Login
//             </Typography>
//             <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
              
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="ration"
//                 label="Ration Card ID"
//                 name="id"
//                 autoFocus
//               />
     
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
                
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
               
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//       <Footer/>
      
//     </ThemeProvider>
//   );
// }
// }

// export default ConsumerLogin;


function ConsumerLogin() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [passErr, setPassErr] = useState(false);
  const [addrErr, setAddrErr] = useState(false);
  const [idErr, setIdErr] = useState(false);
  const [rationNo, setRationNo] = useState("");
  const [open, setOpen] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);

  const [otp, setOtp] = useState(0);
  const handleOpenOtpModal = () => setOpenOtpModal(true);
  const handleCloseOtpModal = () => setOpenOtpModal(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const location = useLocation();
  let state1 = location.state;

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

  // Similar to componentDidMount and componentDidUpdate:

  useEffect(async () => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }

    console.log('hello');
    console.log('hello1');

    const web3 = await getWeb3();
    console.log(web3)
    console.log('hello2')

    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    const networkId = await web3.eth.net.getId();

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
  }, []);

  const handleSubmit = async (event) => {
        event.preventDefault();
        // const { contract, accounts } = this.state;
        // this.setState({ web3, accounts, contract: instance }, this.runExample);
        const data = new FormData(event.currentTarget);
        console.log({
          ration: data.get('id'),
          password: data.get('password'),
        });
          const password_error = await contract.methods.checkConsumerCredentials(data.get('id'), data.get('password'));
          const consumer = await contract.methods.getConsumer(data.get("id")).call();          
          const consumerId = data.get("id");
          console.log(consumerId);

          if(consumer[0] == ""){
            setIdErr(true);
          }
          else{
            setIdErr(false);
            console.log(consumer);
        // console.log(transactions);
    
        console.log(consumer[7]);
    
        // let navigate = useNavigate();
    
        if(password_error){
          setPassErr(false);
          if(consumer[8] == accounts[0]){

            setAddrErr(false);
            // this.navigate('/consumer-home');
            console.log("GG");
            navigate('/consumer-home', {state:{id:consumerId}});
            // this.props.history.push("/login-consumer");
            // return <Navigate replace={true} to="/consumer-home" />
            // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
            // window.location.href='/consumer-home';
          
          }
          else{
            console.log("Incorrect wallet address");
            // navigate('/login-consumer');
            setAddrErr(true);
            // navigate.push('/login-consumer');
            // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
          }
        }
        else{
          console.log("Incorrect password");
          // navigate('/login-consumer');
          setPassErr(true);
          // return <Route path="/consumer-home" element={ <Navigate to="/consumer-home" /> } />
        }
          }

          
        // await contract.methods.updateAllowance(data.get('id'), 1, [1, 1, 0, 1], Date().toLocaleString()).send({from: accounts[0]});
        // const transactions = await contract.methods.getTransactions(data.get("id")).call();
        
        
      };


  const forgotPassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const consumer = await contract.methods.getConsumer(data.get("ration-card-no")).call();

    const min = 1000;
    const max = 9999;
    const rand = Math.round(min + Math.random() * (max - min));
    setOtp(rand);
    const message = {
      to: consumer[4],
      body: 'Your OTP is ' + rand 
    }
    fetch('http://127.0.0.1:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('OTP sent successfully on your registered mobile number')
          
          handleOpenOtpModal();
        } else {
          alert('Otp sending failed! Please try again');
        }
      });
  }

  const resetPassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otpForm = parseInt(data.get('otp'));
    if (otpForm == otp) {
      const newpass = data.get('new-password');
      await contract.methods.resetConsumerPassword(rationNo, newpass).send({from: accounts[0]});
      setRationNo("");
      handleCloseOtpModal();
      handleClose();
      alert('Password reset successful!');
    } else {
      handleCloseOtpModal();
      alert('Otp verification failed. Please try again!')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
         <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.theconversation.com/files/389530/original/file-20210315-21-ajek7r.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)',
            backgroundRepeat: 'no-repeat', height:"100%",
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1,  }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{color:"#351E10", fontWeight:"bold"}}>
              Consumer Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="ration"
                label="Ration Card ID"
                name="id"
                autoFocus
              />
     
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                
              />

              {idErr? <div style={{color:"red"}}>Invalid Ration ID</div> : <div></div>}
              {passErr? <div style={{color:"red"}}>Incorrect password</div> : <div></div>}
              {addrErr? <div style={{color:"red"}}>Incorrect address</div> : <div></div>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
               
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={handleOpen} > 
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
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
          
          <Box component="form" onSubmit={forgotPassword} noValidate sx={{ mt: 1 }}>
            <Typography>Enter your Ration card Number</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ration-card-no"
              label="Ration card number"
              name="ration-card-no"
              onChange={setRationNo}
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
              
            >
              Send sms
            </Button>
          </Box>
        </Box>
          
      </Modal>

      
      <Modal
      backgroundColor="#000000"
        open={openOtpModal}
        onClose={handleCloseOtpModal}
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
          
          <Box component="form" onSubmit={resetPassword} noValidate sx={{ mt: 1 }}>
            <Typography>Enter your OTP</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoFocus
            />

            <Typography>Enter your new password</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="New Password"
              name="new-password"
              type="password"
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2 , backgroundColor: "#DDAA00", "&:hover":{backgroundColor:'#DDAA00'}, color:"#351E10", fontWeight:"bold"}}
              
            >
              Reset Password
            </Button>
          </Box>
        </Box>
          
      </Modal>

      <Footer/>
      
    </ThemeProvider>
  );
}

export default ConsumerLogin;