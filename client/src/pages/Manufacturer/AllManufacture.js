import React from "react";
import Navbar from "../../components/Navbar"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      
      const classes = useStyles();

    return(
        <>
        <Navbar>
        <h1>All Manufactured Products</h1>
        <h2>Total : {count}</h2>
                <>
                    <div>


                    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Universal ID</TableCell>
            <TableCell align="right">SKU</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Manufacturer</TableCell>
            <TableCell align="right">Name of Manufacturer</TableCell>
            <TableCell align="right">Details of Manufacturer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {allManufacture.length !== 0 ? (allManufacture.map((prod) => (
            <TableRow key={prod[0]}>
              <TableCell component="th" scope="row">{prod[0]}</TableCell>
              <TableCell align="right">{prod[1]}</TableCell>
              <TableCell align="right">{prod[2]}</TableCell>
              <TableCell align="right" style={{width: "30px",textOverflow: "ellipsis"}}>{prod[3]}</TableCell>
              <TableCell align="right">{prod[4]}</TableCell>
              <TableCell align="right">{prod[5]}</TableCell>
            </TableRow>
          ))): <> </>}
        </TableBody>
      </Table>
    </TableContainer>
    
                    </div>
                    
                </>
         
          </Navbar>
        </>
    )
}