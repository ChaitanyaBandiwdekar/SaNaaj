// import * as React from 'react';
// import ReactDOM from 'react-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from '../Header';
// import Footer from '../Footer';

// import Sanaaj from "../../contracts/Sanaaj.json";
// import getWeb3 from "../../getWeb3";


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




// class VendorLogin extends React.Component {

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

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     // this.setState({ web3, accounts, contract: instance }, this.runExample);
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('id'),
//       password: data.get('password'),
//     });
//     // const consumer = await instance.methods.getConsumer(data.get("id")).call();
//     // console.log(consumer)
//     // } catch (error) {
//     //   // Catch any errors for any of the above operations.
//     //   alert(
//     //     `Failed to load web3, accounts, or contract. Check console for details.`,
//     //   );
//     //   console.error(error);
//     // }
    
    
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
//               Vendor Login
//             </Typography>
//             <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
              
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="vendor"
//                 label="Vendor ID"
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

// export default VendorLogin;


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
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function VendorLogin() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [passErr, setPassErr] = useState(false);
  const [addrErr, setAddrErr] = useState(false);
  const [idErr, setIdErr] = useState(false);
  const theme = createTheme();
  let navigate = useNavigate();
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
        console.log(typeof(data.get("id")));
        const vendor = await contract.methods.getVendor(data.get("id")).call();

        if(vendor[0] == "0"){
          setIdErr(true);
        }
        else{
          setIdErr(false);
        // await contract.methods.updateAllowance(data.get('id'), 1, [1, 1, 0, 1], Date().toLocaleString()).send({from: accounts[0]});
        // const transactions = await contract.methods.getTransactions(data.get("id")).call();
        console.log(vendor);
        // console.log(transactions);
    
        console.log(vendor[5]);
    
        // let navigate = useNavigate();
    
        if(data.get('password') == vendor[5]){
          setPassErr(false);
          if(vendor[7] == accounts[0]){

            setAddrErr(false);
            // this.navigate('/consumer-home');
            console.log("GG");
            navigate('/vendor-home');
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
        
      };

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
              Vendor Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="vendor"
                label="Vendor ID"
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
              {idErr? <div style={{color:"red"}}>Invalid Vendor ID</div> : <div></div>}
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer/>
      
    </ThemeProvider>
  );
}

export default VendorLogin;