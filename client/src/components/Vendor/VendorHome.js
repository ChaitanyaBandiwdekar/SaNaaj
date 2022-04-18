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
import Header from '../Header';
import Footer from '../Footer';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sanaaj from "../../contracts/Sanaaj.json";
import getWeb3 from "../../getWeb3";


function VendorHome() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [passErr, setPassErr] = useState(false);
    const [addrErr, setAddrErr] = useState(false);
    const theme = createTheme();
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
    });
  
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
          
        };
  
    return (
      <h1>Vendor Home</h1>
    );
  }
  
export default VendorHome;