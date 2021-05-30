import React from 'react';
import ResponsiveDrawer from "../components/Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../context/RoleDataContext";
import { useStyles } from "../components/Styles";

function RoleAdmin(props) {
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;
  const { roles, setRoles } = useRole();

  const classes = useStyles();
  const [manufacturerRole, setManufacturerRole] = React.useState("");
  const [thirdPartyRole, setThirdPartyRole] = React.useState("");
  const [deliveryHubRole, setDeliveryHubRole] = React.useState("");
  const [customerRole, setCustomerRole] = React.useState("");
  const navItem = [];

  const handleAddManufacturerRole = async () => {
    await setRoles({
      ...roles, 
      manufacturer : manufacturerRole
    })

    localStorage.setItem("mRole", manufacturerRole);
    await supplyChainContract.methods.addManufacturerRole(manufacturerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setManufacturerRole("");
  }
  
  const handleAddThirdPartyRole = async () => {
    await setRoles({
      ...roles, 
      thirdparty : thirdPartyRole
    })

    localStorage.setItem("tpRole", thirdPartyRole);
    await supplyChainContract.methods.addThirdPartyRole(thirdPartyRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setThirdPartyRole("");
  }

  const handleAddDeliveryHubRole = async () => {
    await setRoles({
      ...roles, 
      deliveryhub : deliveryHubRole
  })

   localStorage.setItem("dhRole", deliveryHubRole);
    await supplyChainContract.methods.addDeliveryHubRole(deliveryHubRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setDeliveryHubRole("");
  }

  const handleAddCustomerRole = async () => {
    await setRoles({
      ...roles, 
    customer : customerRole
  })

   localStorage.setItem("cRole", customerRole);
    await supplyChainContract.methods.addCustomerRole(customerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

   

    setCustomerRole("");
  }


  return (
    <div>
      <ResponsiveDrawer navItems={navItem}>
      <div className={classes.FormWrap}>
      <h1 className={classes.pageHeading}>Add Roles</h1>
      {console.log(roles)}
      
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="manufacturerRole"
            label="Enter Manufacturer Address"
            variant="outlined"
            value={manufacturerRole}
            onChange={(e) => setManufacturerRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddManufacturerRole}
            style={{width:"30%", marginLeft:"10px"}}
          >
            Add Manufacturer
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="thirdPartyRole"
            label="Enter Third Party Address "
            variant="outlined"
            value={thirdPartyRole}
            onChange={(e) => setThirdPartyRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddThirdPartyRole}
            style={{width:"30%", marginLeft:"10px"}}
          >
            Add third party
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="deliveryHubRole"
            label="Enter Delivery Hub Address"
            variant="outlined"
            value={deliveryHubRole}
            onChange={(e) => setDeliveryHubRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDeliveryHubRole}
            style={{width:"30%", marginLeft:"10px"}}
          >
            add delivery hub
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="customerRole"
            label=" Enter Customer Address"
            variant="outlined"
            value={customerRole}
            onChange={(e) => setCustomerRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomerRole}
            style={{width:"30%", marginLeft:"10px"}}
          >
            add customer
          </Button>
        </div>
      </form>
      </div>
      <div className={classes.FormWrap}>
        <h1 className={classes.pageHeading}>Local Accounts</h1>
        {accounts.slice(1).map((acc) => (
          <h3 className={classes.tableCount}>{acc}</h3>
        ))}
        
      </div>

      </ResponsiveDrawer>
    </div>
  );
}

export default RoleAdmin;
