import * as React from 'react';
import ReactDOM from 'react-dom';
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
import { useLocation } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
import { red } from '@mui/material/colors';
import Sanaaj from "../../contracts/Sanaaj.json";
import getWeb3 from "../../getWeb3";


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();


class AuthorityLogin extends React.Component {

  state = { web3: null, 
    accounts: null, 
    contract: null,
    state1: null
  };
  
  componentDidMount = async () => {

    console.log('hello');
    console.log('hello1')

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
    this.setState({ web3, accounts, contract: instance });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // this.setState({ web3, accounts, contract: instance }, this.runExample);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('id'),
      password: data.get('password'),
    });
    // const consumer = await instance.methods.getConsumer(data.get("id")).call();
    // console.log(consumer)
    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`,
    //   );
    //   console.error(error);
    // }
    
    
  };

  
  
  render(){ 
    return (
    <ThemeProvider theme={theme}>
      <Header/>
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
              Admin Login
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
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
}

export default AuthorityLogin;