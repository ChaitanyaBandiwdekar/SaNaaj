import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Sanaaj from "./contracts/Sanaaj.json";
import Test from "./contracts/Test.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { item: "", 
            price: 0, 
            customer: "", 
            merchant: "", 
            newItem: "", 
            newPrice: 0, 
            newCustomer: "", 
            newMerchant: "",
            test: 0, 
            web3: null, 
            accounts: null, 
            contract: null,
            contract1: null,
            name: "",
            phone: "",
          };

  componentDidMount = async () => {
    try {

      this.handleItemChange = this.handleItemChange.bind(this)
      this.handlePriceChange = this.handlePriceChange.bind(this)
      this.handleCustChange = this.handleCustChange.bind(this)
      this.handleMerchantChange = this.handleMerchantChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleInfoSubmit = this.handleInfoSubmit.bind(this)
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Sanaaj.networks[networkId];
      const instance = new web3.eth.Contract(
        Sanaaj.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const deployedNetwork1 = Test.networks[networkId];
      const instance1 = new web3.eth.Contract(
        Test.abi,
        deployedNetwork1 && deployedNetwork1.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, contract1: instance1 }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleItemChange(event){
    this.setState({newItem: event.target.value});
  }
  handlePriceChange(event){
    this.setState({newPrice: event.target.value});
  }
  handleCustChange(event){
    this.setState({newCustomer: event.target.value});
  }
  handleMerchantChange(event){
    this.setState({newMerchant: event.target.value});
  }
  
  handleSubmit = async(event) => {
    event.preventDefault();
    const { accounts, contract, contract1 } = this.state;

    await contract.methods.set(this.state.newItem, this.state.newPrice, this.state.newCustomer, this.state.newMerchant).send({from: accounts[0]});
    const response = await contract.methods.get().call();
    // const consumers = contract1.methods.getAll().call();
    const consumer = contract1.methods.getConsumer(1).call();
    this.setState({item: response[0], price: response[1], customer: response[2], merchant: response[3], name: consumer["first_name"]});
  }

  async handleInfoSubmit(event){

  }

  runExample = async () => {
    const { contract } = this.state;
    
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    
    // Update state with the result.
    this.setState({item: response[0]});
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Demo Dapp</h1>
        
        <div>The item is: {this.state.item}</div>
        <div>The price is: {this.state.price}</div>
        <div>The customer is: {this.state.customer}</div>
        <div>The merchant is: {this.state.merchant}</div>
        <div>The new name is: {this.state.name}</div>

        <form onSubmit={this.handleSubmit}>
          <p>Item name: </p>
          <input type="text" value={this.state.newItem} onChange={this.handleItemChange.bind(this)}/> <br/>

          <p>Price: </p>
          <input type="number" value={this.state.newPrice} onChange={this.handlePriceChange.bind(this)}/> <br/>

          <p>Customer name: </p>
          <input type="text" value={this.state.newCustomer} onChange={this.handleCustChange.bind(this)}/> <br/>

          <p>Merchant name: </p>
          <input type="text" value={this.state.newMerchant} onChange={this.handleMerchantChange.bind(this)}/> <br/>
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={this.handleInfoSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
