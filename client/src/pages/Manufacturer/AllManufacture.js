import React from "react";
import Navbar from "../../components/Navbar"

export default function AllManufacture(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

    const [count, setCount] = React.useState(0);
    const [allManufacture, setAllManufacture] = React.useState([]);

    React.useEffect(() => {
        (async () => {
        const cnt = await supplyChainContract.methods.fetchProductCount().call();
        setCount(cnt);
        console.log(count)
        }) ();

        (async () => {
            const arr = [];
            for(var i = 1; i<count; i++){
                var b = await supplyChainContract.methods.fetchProductPart1(i, 'product', 0).call();
                console.log(b);
                arr.push(b);
            }
            await setAllManufacture(arr);
            
            }) ();

    }, [count])

    return(
        <>
        <Navbar/>
        <h1>All Manufactured Products</h1>
        <h2>Total : {count}</h2>
          {allManufacture.length !== 0 ? (allManufacture.map((prod) => (
                <>
                    <div>
                    <p>Universal ID : {prod[0]}</p>
                    <p>SKU : {prod[1]}</p>
                    <p>Owner : {prod[2]}</p>
                    <p>Manufacturer : {prod[3]}</p>
                    <p>Name of Manufacturer : {prod[4]}</p>
                    <p>Details of Manufacturer : {prod[5]}</p>
                    <p>Longitude of Manufature : {prod[6]}</p>
                    <p>Latitude of Manufature : {prod[7]}</p>
                    </div>
                    
                </>
          ))) : <> </>}
        </>
    )
}