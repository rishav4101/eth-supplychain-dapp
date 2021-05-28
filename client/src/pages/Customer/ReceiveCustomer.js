import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import ProductModal from "../../components/Modal";
import { useRole } from "../../context/RoleDataContext";

export default function ReceiveCustomer(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;
    const { roles } = useRole();
    const [count, setCount] = React.useState(0);
    const [allReceiveProducts, setAllReceiveProducts] = React.useState([]);
    const [modalData, setModalData] = useState([]);
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        (async () => {
        const cnt = await supplyChainContract.methods.fetchProductCount().call();
        setCount(cnt);
        console.log(count)
        }) ();

        (async () => {
            const arr = [];
            for(var i = 1; i<count; i++){
                var a = await supplyChainContract.methods.fetchProductPart1(i, 'product', 0).call();
                var b = await supplyChainContract.methods.fetchProductPart2(i, 'product', 0).call();
                if(b[5] == "7"){
                    const ar = [];
                    ar.push(a); ar.push(b);
                    arr.push(ar);
                }
            }
            await setAllReceiveProducts(arr);
            
            }) ();

    }, [count])

    const handleReceiveButton = async (id) => {
        await supplyChainContract.methods.receiveByCustomer(parseInt(id)).send({ from: roles.customer, gas:1000000 }).then(console.log);
        setCount(0);
        setOpen(false);
    }

    const handleClose = () => setOpen(false);

    const handleClick = async (prod) => {
      await setModalData(prod);
      console.log(modalData);
      setOpen(true);
    };

    return(
        <>
        <Navbar>
        <ProductModal prod={modalData} open={open} handleClose={handleClose} handleReceiveButton={handleReceiveButton} />

        <h1>All Products To be Shipped</h1>
        <h2>Total : {count}</h2>
          {allReceiveProducts.length !== 0 ? (allReceiveProducts.map((prod) => (
                <>
                    <div>
                    <p>Universal ID : {prod[0][0]}</p>
                    <p>SKU : {prod[0][1]}</p>
                    <p>Owner : {prod[0][2]}</p>
                    <p>Manufacturer : {prod[0][3]}</p>
                    <p>Name of Manufacturer : {prod[0][4]}</p>
                    <p>Details of Manufacturer : {prod[0][5]}</p>
                    <p>Longitude of Manufature : {prod[0][6]}</p>
                    <p>Latitude of Manufature : {prod[0][7]}</p>

                    <p>Manufactured date : {prod[1][0]}</p>
                    <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleClick(prod)}
            >
                Recieve
            </Button>
                    </div>
                    
                </>
          ))) : <> </>}
          </Navbar>
        </>
    )
}