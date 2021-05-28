import React from "react";
import Navbar from "../../components/Navbar"

export default function ReceivedByCustomer(props){
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

    const [count, setCount] = React.useState(0);
    const [allReceived, setAllReceived] = React.useState([]);

    React.useEffect(() => {
        (async () => {
        const cnt = await supplyChainContract.methods.fetchProductCount().call();
        setCount(cnt);
        console.log(count)
        }) ();

        (async () => {
            const arr = [];
            for(var i = 1; i<count; i++){
                const a = await supplyChainContract.methods.fetchProductPart1(i, 'product', 0).call();
                const b = await supplyChainContract.methods.fetchProductPart2(i, 'product', 0).call();
                const c = await supplyChainContract.methods.fetchProductPart3(i, 'product', 0).call();

                if(b[5] == "8"){
                    const ar = [];
                    ar.push(a); ar.push(b); ar.push(c); 
                    
                    arr.push(ar);
                }
            }
            await setAllReceived(arr);
            
            }) ();

    }, [count])

    return(
        <>
        <Navbar/>
        <h1>All Received Products</h1>
        <h2>Total : {count}</h2>
          {allReceived.length !== 0 ? (allReceived.map((prod) => (
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
                    </div>
                    
                </>
          ))) : <> </>}
        </>
    )
}