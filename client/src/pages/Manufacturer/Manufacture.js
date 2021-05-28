import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../../context/RoleDataContext";
import Navbar from "../../components/Navbar"
import { useStyles } from "../../components/Styles";
import Grid from '@material-ui/core/Grid';

export default function Manufacture(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;
    const classes = useStyles();
    const { roles } = useRole();

    console.log(roles);
    const navItem = [
        ["Add Product","/manufacturer/manufacture"],
        ["Ship Product", "manufacturer/ship"],
        ["All Products","/manufacturer/allManufacture"]
      ];
    const [manuForm, setManuForm] = React.useState({
        id: 0,
        manufacturerName: "",
        manufacturerDetails: "",
        manufacturerLongitude: "",
        manufacturerLatitude: "",
        productName: "",
        productCode: 0,
        productPrice: 0,
        productCategory: ""
    });

    const handleChangeManufacturerForm = async (e) => {
        setManuForm({
            ...manuForm,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitManufacturerForm = async () => {
        console.log(parseInt(manuForm.id));
        await supplyChainContract.methods.manufactureProduct( manuForm.manufacturerName, manuForm.manufacturerDetails, manuForm.manufacturerLongitude, manuForm.manufacturerLatitude, manuForm.productName, parseInt(manuForm.productCode), parseInt(manuForm.productPrice), manuForm.productCategory).send({ from: roles.manufacturer, gas:999999 }).then(console.log);
    }

    const createProduct = async () => {
        for(var i = 0 ;i < 20 ;i++){
            await supplyChainContract.methods.manufactureProduct("product"+i,"manufacturer"+1,"98","89","mi"+i,99+i,12000,"electronics").send({ from: roles.manufacturer, gas:999999 }).then(console.log);
        }
        
    }

    return (
        <>
<<<<<<< HEAD
        <Navbar navItems={navItem}>
        <br/>

        <h2>Manufacture Prod Form</h2>
            <TextField
            name="id"
            variant="outlined"
            value={manuForm.id}
            onChange={handleChangeManufacturerForm}
            label="id"
            />
=======
        <Navbar>
        <div className={classes.FormWrap}>
        <h1 className={classes.pageHeading}>Manufacture Product</h1>
        <Grid container spacing={3}>
        <Grid item xs={12}>
>>>>>>> fb2cf150eb149a3784fa6e06f3cf0b9c3b6df3b0
            <TextField
            name="manufacturerName"
            variant="outlined"
            value={manuForm.manufacturerName}
            onChange={handleChangeManufacturerForm}
            label="Manufacturer Name"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            name="manufacturerDetails"
            variant="outlined"
            value={manuForm.manufacturerDetails}
            onChange={handleChangeManufacturerForm}
            label="Manufacturer Details"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
            name="manufacturerLongitude"
            variant="outlined"
            value={manuForm.manufacturerLongitude}
            onChange={handleChangeManufacturerForm}
            label="Longitude"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
            name="Latitude"
            variant="outlined"
            value={manuForm.manufacturerLatitude}
            onChange={handleChangeManufacturerForm}
            label="Latitude"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            name="productName"
            variant="outlined"
            value={manuForm.productName}
            onChange={handleChangeManufacturerForm}
            label="Product Name"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
            name="productCode"
            variant="outlined"
            value={manuForm.productCode}
            onChange={handleChangeManufacturerForm}
            label="Product Code"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
            name="productPrice"
            variant="outlined"
            value={manuForm.productPrice}
            onChange={handleChangeManufacturerForm}
            label="Product Price"
            style={{width:"100%"}}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            name="productCategory"
            variant="outlined"
            value={manuForm.productCategory}
            onChange={handleChangeManufacturerForm}
            label="Product Category"
            style={{width:"100%"}}
            />
            </Grid>
            </Grid>
            <br/>
             <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmitManufacturerForm}
            >
                MANUFACTURE
            </Button>

        <br/>
        <br/>
        
        <Button type="submit" variant="contained" color="danger" onClick={createProduct}>Create 20 Test Products</Button>
        </div>
            </Navbar>
        </>
    );
}