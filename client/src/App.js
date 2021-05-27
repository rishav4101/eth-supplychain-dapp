import React, { Component } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import ManufacturerContract from "./contracts/Manufacturer.json"; 
import { Router, Switch, Route } from "react-router-dom";
// import history from "./history";
import {createBrowserHistory} from 'history';
import getWeb3 from "./getWeb3";

import Manufacturer from "./pages/Manufacturer/Manufacture";
import AllManufacture from "./pages/Manufacturer/AllManufacture";


import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // instance2.options.address = accounts[0];
      // instance.options.address = accounts[0];

      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;
    console.log(contract);

    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/">
              <Manufacturer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/allManufacture">
              <AllManufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
