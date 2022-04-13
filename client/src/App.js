import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Sanaaj from "./contracts/Sanaaj.json";
import Test from "./contracts/Test.json";
import getWeb3 from "./getWeb3";

import "./App.css";

// const SimpleList = ({ list }) => (
//   <ul>
//     {list.map(item => (
//       <li key={item}>{item}</li>
//     ))}
//   </ul>
// );


class App extends Component {
  state = { web3: null, 
            accounts: null, 
            contract: null,
            name: "",
            phone: "",
            allowance: 0,
            newAllowance: 0,
            consumers: [],
            loading: true
          };

  

  componentDidMount = async () => {
    try {
      this.handleSubmit = this.handleSubmit.bind(this);
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = Test.networks[networkId];
      const instance = new web3.eth.Contract(
        Test.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  handleSubmit = async(event) => {
      event.preventDefault();
   
      console.log('do validate');
      const { accounts, contract, phone } = this.state;

      await contract.methods.updateAllowance(phone, event.target.value).send({from: accounts[0]});
      // const consumers = contract1.methods.getAll().call();
      const consumer = contract.methods.getConsumer(phone).call();

      this.setState({name: consumer[1], allowance: consumer[5]});
  
    
  }


  runExample = async () => {
    const { contract, accounts } = this.state;
    
    // Get the value from the contract to prove it worked.
    console.log(typeof(accounts[0]));
    const phone = await contract.methods.getPhoneNumber(accounts[0]).call();
    console.log(phone);
    const consumer = await contract.methods.getConsumer(phone).call();
    console.log(consumer);
    // const consumers = await contract.methods.getAll().call();
    // Update state with the result.
    this.setState({name: consumer[1], allowance: consumer[5], phone: phone});
    // this.setState({ storageValue: response })
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Sanaaj</h1> 
        {/* <div>Check {this.state.consumers[1]}</div> */}
        
        <div>The name is: {this.state.name}</div>
        <div>The phone is: {this.state.phone}</div>
        <div>The allowance is: {this.state.allowance}</div>
        <div>Addr: {this.state.accounts}</div>

        <form onSubmit={this.handleSubmit}>
          <p>Allowance: </p>
          <input type="number" onChange={this.handleSubmit.bind(this)}/> <br/>

          <button type="submit">Submit</button>
        </form>

      </div>

      
    );
  }
}

export default App;
