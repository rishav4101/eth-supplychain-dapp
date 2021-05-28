import React from "react";
import Navbar from "../../components/Navbar"
import Button from "@material-ui/core/Button";

export default function ShipThirdParty(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

    const [count, setCount] = React.useState(0);
    const [allSoldProducts, setAllSoldProducts] = React.useState([]);

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
                if(b[5] == "4"){
                    const ar = [];
                    ar.push(a); ar.push(b);
                    arr.push(ar);
                }
            }
            await setAllSoldProducts(arr);
            
            }) ();

    }, [count])

    const handleShipButton = async id => {
        await supplyChainContract.methods.shipByThirdParty(id).send({ from: accounts[8], gas:1000000 }).then(console.log);
        setCount(0);
    }

    return(
        <>
        <Navbar/>
        <h1>All Products To be Shipped</h1>
        <h2>Total : {count}</h2>
          {allSoldProducts.length !== 0 ? (allSoldProducts.map((prod) => (
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
                onClick={() => handleShipButton(prod[0][0])}
            >
                SHIP
            </Button>
                    </div>
                    
                </>
          ))) : <> </>}
        </>
    )
}