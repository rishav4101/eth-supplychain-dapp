import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../../context/RoleDataContext";
import Navbar from "../../components/Navbar"

export default function Manufacture(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

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

    const fetchManufacturedProduct = async () => {
        const test = await supplyChainContract.methods.fetchProductPart1(3, "product", 0).call().then(console.log);
        console.log(test);
    }
    const createProduct = async () => {
        for(var i = 0 ;i < 20 ;i++){
            await supplyChainContract.methods.manufactureProduct("product"+i,"manufacturer"+1,"98","89","mi"+i,99+i,12000,"electronics").send({ from: roles.manufacturer, gas:999999 }).then(console.log);
        }
        
    }
    return (
        <>
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
            <TextField
            name="manufacturerName"
            variant="outlined"
            value={manuForm.manufacturerName}
            onChange={handleChangeManufacturerForm}
            label="manufacturerName"
            />
            <TextField
            name="manufacturerDetails"
            variant="outlined"
            value={manuForm.manufacturerDetails}
            onChange={handleChangeManufacturerForm}
            label="manufacturerDetails"
            />
            <TextField
            name="manufacturerLongitude"
            variant="outlined"
            value={manuForm.manufacturerLongitude}
            onChange={handleChangeManufacturerForm}
            label="manufacturerLongitude"
            />
            <TextField
            name="manufacturerLatitude"
            variant="outlined"
            value={manuForm.manufacturerLatitude}
            onChange={handleChangeManufacturerForm}
            label="manufacturerLatitude"
            />
            <TextField
            name="productName"
            variant="outlined"
            value={manuForm.productName}
            onChange={handleChangeManufacturerForm}
            label="productName"
            />
            <TextField
            name="productCode"
            variant="outlined"
            value={manuForm.productCode}
            onChange={handleChangeManufacturerForm}
            label="productCode"
            />
            <TextField
            name="productPrice"
            variant="outlined"
            value={manuForm.productPrice}
            onChange={handleChangeManufacturerForm}
            label="productPrice"
            />
            <TextField
            name="productCategory"
            variant="outlined"
            value={manuForm.productCategory}
            onChange={handleChangeManufacturerForm}
            label="productCategory"
            />
             <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmitManufacturerForm}
            >
                SUBMIT
            </Button>

        <br/>

        <h2>Manufactured Prods</h2>
        <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={fetchManufacturedProduct}
            >
                TEST FETCH
            </Button>
        <Button type="submit" variant="contained" color="danger" onClick={createProduct}>Create Product</Button>
            </Navbar>
        </>
    );
}