import React from 'react';
import ResponsiveDrawer from "../components/Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useRole } from "../context/RoleDataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "20px auto",
      width: "60%",
    },
  },
}));

function RoleAdmin(props) {
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;
  const { roles, setRoles } = useRole();

  const classes = useStyles();
  const [manufacturerRole, setManufacturerRole] = React.useState("");
  const [thirdPartyRole, setThirdPartyRole] = React.useState("");
  const [deliveryHubRole, setDeliveryHubRole] = React.useState("");
  const [customerRole, setCustomerRole] = React.useState("");

  const handleAddManufacturerRole = async () => {
    await supplyChainContract.methods.addManufacturerRole(manufacturerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    await setRoles({
      ...roles, 
      manufacturer : manufacturerRole
    })

    localStorage.setItem("mRole", manufacturerRole);

    setManufacturerRole("");
  }
  
  const handleAddThirdPartyRole = async () => {
    await supplyChainContract.methods.addThirdPartyRole(thirdPartyRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    await setRoles({
        ...roles, 
        thirdparty : thirdPartyRole
    })

    localStorage.setItem("tpRole", thirdPartyRole);

    setThirdPartyRole("");
  }

  const handleAddDeliveryHubRole = async () => {
    await supplyChainContract.methods.addDeliveryHubRole(deliveryHubRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    await setRoles({
        ...roles, 
        deliveryhub : deliveryHubRole
    })

    localStorage.setItem("dhRole", deliveryHubRole);

    setDeliveryHubRole("");
  }

  const handleAddCustomerRole = async () => {
    await supplyChainContract.methods.addCustomerRole(customerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    await setRoles({
        ...roles, 
      customer : customerRole
    })

    localStorage.setItem("cRole", customerRole);

    setCustomerRole("");
  }


  return (
    <div>
      <ResponsiveDrawer>

      <h1>Add Roles</h1>
      {console.log(roles)}
      
      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ marginLeft: "25%", marginTop: "60px" }}>
          <TextField
            id="manufacturerRole"
            label="Enter Manufacturer Address"
            variant="outlined"
            value={manufacturerRole}
            onChange={(e) => setManufacturerRole(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddManufacturerRole}
            style={{
              marginLeft: "30px",
              marginTop: "14px",
              fontSize: "01.275rem",
            }}
          >
            Submit
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ marginLeft: "25%", marginTop: "40px" }}>
          <TextField
            id="thirdPartyRole"
            label="Enter Third Party Address "
            variant="outlined"
            value={thirdPartyRole}
            onChange={(e) => setThirdPartyRole(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddThirdPartyRole}
            style={{
              marginLeft: "30px",
              marginTop: "14px",
              fontSize: "01.275rem",
            }}
          >
            Submit
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ marginLeft: "25%", marginTop: "40px" }}>
          <TextField
            id="deliveryHubRole"
            label="Enter Delivery Hub Address"
            variant="outlined"
            value={deliveryHubRole}
            onChange={(e) => setDeliveryHubRole(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDeliveryHubRole}
            style={{
              marginLeft: "30px",
              marginTop: "14px",
              fontSize: "01.275rem",
            }}
          >
            Submit
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ marginLeft: "25%", marginTop: "40px" }}>
          <TextField
            id="customerRole"
            label=" Enter Customer Address"
            variant="outlined"
            value={customerRole}
            onChange={(e) => setCustomerRole(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomerRole}
            style={{
              marginLeft: "30px",
              marginTop: "14px",
              fontSize: "01.275rem",
            }}
          >
            Submit
          </Button>
        </div>
      </form>
      </ResponsiveDrawer>
    </div>
  );
}

export default RoleAdmin;
