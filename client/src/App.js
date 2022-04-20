import React, { Component } from "react";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import ConsumerLogin from "./components/Consumer/ConsumerLogin";
import VendorLogin from "./components/Vendor/VendorLogin";
import AuthorityLogin from "./components/Authority/AuthorityLogin";
import ConsumerHome from "./components/Consumer/ConsumerHome";
import VendorHome from "./components/Vendor/VendorHome";
import Header from "./components/Header";

class App extends Component {
  state = { web3: null, 
            accounts: null, 
            contract: null,
            name: "",
            phone: "",
            allowance: 0,
            newAllowance: 0,
            consumers: [],
            ration: "MH1234509876",
            allowance: []
          };

  

  // componentDidMount = async () => {
  //   try {
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();
  //     const networkId = await web3.eth.net.getId();

  //     const deployedNetwork = Sanaaj.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       Sanaaj.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };
  
  // handleSubmit = async(event) => {
  //     event.preventDefault();
   
  //     console.log('do validate');
  //     const { accounts, contract, phone } = this.state;

  //     // await contract.methods.updateAllowance(phone, event.target.value).send({from: accounts[0]});
  //     // const consumers = contract1.methods.getAll().call();
  //     const consumer = contract.methods.getConsumer(phone).call();

  //     this.setState({name: consumer[1], allowance: consumer[5]});
  
    
  // }


  // runExample = async () => {
  //   const { contract, accounts, ration } = this.state;
    
  //   // Get the value from the contract to prove it worked.
    
  //   // const phone = await contract.methods.getPhoneNumber(accounts[0]).call();
  //   // console.log(phone);
  //   const consumer = await contract.methods.getConsumer(ration).call();
  //   // console.log(consumer);
  //   // const consumers = await contract.methods.getAll().call();
  //   const alw = await contract.methods.getAllowance(ration).call();
  //   // console.log(alw);
  //   const consumers = await contract.methods.getAllConsumers(1, false).call();
  //   // console.log(consumers);
  //   // Update state with the result.
  //   this.setState({name: consumer[2], allowance: alw});

  //   // this.setState({ storageValue: response })
  // };

  render() {
    return (
      <div className="App">
        <Header/>
        {/* <h1>Welcome to React Router!</h1> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login-consumer" element={<ConsumerLogin/>}/>
          <Route path="/login-vendor" element={<VendorLogin/>}/>
          <Route path="/login-authority" element={<AuthorityLogin/>}/>
          <Route path="/consumer-home" element={<ConsumerHome />} />
          <Route path="/vendor-home" element={<VendorHome />} />
        </Routes>
        
      </div>
    );
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    // return (
    //   <div className="App">
  
    //     <h1>Sanaaj</h1>
    //     {/* <div>Check {this.state.consumers[1]}</div> */}
        
    //     <div>The name is: {this.state.name}</div>
    //     {/* <div>The phone is: {this.state.phone}</div> */}
    //     <div>The allowance is: {this.state.allowance[0]}</div>
    //     <div>Addr: {this.state.accounts}</div>

    //     <form onSubmit={this.handleSubmit}>
    //       <p>Allowance: </p>
    //       <input type="number" onChange={this.handleSubmit.bind(this)}/> <br/>

    //       <button type="submit">Submit</button>
    //     </form>

    //   </div>

      
    // );
  }
}

export default App;
