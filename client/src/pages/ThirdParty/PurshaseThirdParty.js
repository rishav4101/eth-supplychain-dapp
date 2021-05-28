import React from "react";
import Navbar from "../../components/Navbar"
import Button from "@material-ui/core/Button";

export default function PurchaseThirdParty(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

    const [count, setCount] = React.useState(0);
    const [allProducts, setAllProducts] = React.useState([]);

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
                if(b[5] == "0"){
                    const ar = [];
                    ar.push(a); ar.push(b);
                    arr.push(ar);
                }
            }
            await setAllProducts(arr);
            
            }) ();

    }, [count])

    const handleBuyButton = async id => {
        await supplyChainContract.methods.purchaseByThirdParty(id).send({ from: accounts[8], gas:1000000 }).then(console.log);
        setCount(0);
    }

    return(
        <>
        <Navbar/>
        <h1>All Products</h1>
        <h2>Total : {count}</h2>
          {allProducts.length !== 0 ? (allProducts.map((prod) => (
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
                onClick={() => handleBuyButton(prod[0][0])}
            >
                BUY
            </Button>
                    </div>
                    
                </>
          ))) : <> </>}
        </>
    )
}