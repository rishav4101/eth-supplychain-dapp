import React, { Component } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import { Router, Switch, Route } from "react-router-dom";
import { RoleDataContextProvider } from "./context/RoleDataContext";
// import history from "./history";
import {createBrowserHistory} from 'history';
import getWeb3 from "./getWeb3";

import Manufacture from "./pages/Manufacturer/Manufacture";
import AllManufacture from "./pages/Manufacturer/AllManufacture";
import ShipManufacture from "./pages/Manufacturer/ShipManufacture";

import "./App.css";
import ReceiveThirdParty from "./pages/ThirdParty/ReceiveThirdParty";
import PurchaseCustomer from "./pages/Customer/PurchaseCustomer";
import ShipThirdParty from "./pages/ThirdParty/ShipThirdParty";
import ReceiveDeliveryHub from "./pages/DeliveryHub/ReceiveDeliveryHub";
import ShipDeliveryHub from "./pages/DeliveryHub/ShipDeliveryHub";
import ReceiveCustomer from "./pages/Customer/ReceiveCustomer";
import ReceivedByCustomer from "./pages/Customer/ReceivedByCustomer";
import PurchaseThirdParty from "./pages/ThirdParty/PurshaseThirdParty";
<<<<<<< HEAD
import Explorer from "./pages/Explorer";
=======
import RoleAdmin from "./pages/RoleAdmin";
>>>>>>> 78211015901729d55565056341eaf8fb8392c4e7

class App extends Component {
  state = { web3: null, accounts: null, contract: null, mRole: null, tpRole: null, dhRole: null, cRole: null };

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

      const mRole = localStorage.getItem("mRole");
      const tpRole = localStorage.getItem("tpRole");
      const dhRole = localStorage.getItem("dhRole");
      const cRole = localStorage.getItem("cRole");

      this.setState({ web3, accounts, contract: instance, mRole: mRole, tpRole: tpRole, dhRole: dhRole, cRole: cRole }, this.runExample);
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
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <RoleDataContextProvider mRole={this.state.mRole} tpRole={this.state.tpRole} dhRole={this.state.dhRole} cRole={this.state.cRole}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/roleAdmin">
              <RoleAdmin accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>

            <Route exact path="/manufacturer/manufacture">
              <Manufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/manufacturer/allManufacture">
              <AllManufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/manufacturer/ship">
              <ShipManufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/ThirdParty/allProducts">
              <PurchaseThirdParty accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/ThirdParty/receive">
              <ReceiveThirdParty accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/Customer/buy">
              <PurchaseCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/ThirdParty/ship">
              <ShipThirdParty accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/DeliveryHub/receive">
              <ReceiveDeliveryHub accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/DeliveryHub/ship">
              <ShipDeliveryHub accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/Customer/receive">
              <ReceiveCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/Customer/allReceived">
              <ReceivedByCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
            <Route exact path="/">
              <Explorer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
            </Route>
          </Switch>
        </Router>
        </RoleDataContextProvider>
      </div>
    );
  }
}

export default App;
