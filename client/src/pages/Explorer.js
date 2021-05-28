import React from "react";
import Paper from '@material-ui/core/Paper';
import Navbar from "../components/Navbar"
import CustomizedInputBase from "../components/Search";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import { MapContainer } from "../components/map";
const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'mname', label: 'Manfacturer', minWidth: 170 },
    { id: 'mdate', label: 'Manufacturing Date', minWidth: 170 },
    { id: 'lastAction', label: 'Last Action', minWidth: 170 },
];
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        marginLeft:"10px",
        marginRight:"10px",
        width: '100%',

    },
}));
const map = ["Manufactured", "Bought By Third Party", "Shipped From Manufacturer", "Received By Third Party", "Bought By Customer", "Shipped By Third Party", "Received at DeliveHub", "Shipped From DeliveryHub", "Received By Customer"];

export default function Explorer(props) {
    const classes = useStyles();
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;
    const [search, setSearch] = React.useState("");
    const [productData, setProductData] = React.useState([]);
    const [productHistory, setProductHistory] = React.useState([]);
    const [Text, setText] = React.useState(false);
    const findProduct = async (search) => {
        var arr = [];
        var temp = [];
        try {
            var a = await supplyChainContract.methods.fetchProductPart1(parseInt(search), 'product', 0).call();
            var b = await supplyChainContract.methods.fetchProductPart2(parseInt(search), 'product', 0).call();
            var c = await supplyChainContract.methods.fetchProductPart3(parseInt(search), 'product', 0).call();
            temp.push(a); temp.push(b); temp.push(c);
            arr.push(temp);
            setProductData(arr);
            arr = [];
            var l = await supplyChainContract.methods.fetchProductHistoryLength(parseInt(search)).call();
            console.log(l);

            for (var i = 0; i < l; i++) {
                var h = await supplyChainContract.methods.fetchProductPart2(parseInt(search), 'history', i).call();
                arr.push(createData(a[0], a[4], h[0], h[5]));
                console.log(arr);
            }
            setProductHistory(arr);
        } catch (e) {
            setText(true);
            console.log(e);
        }

    };
    const createData = (id, mname, date, lc) => {
        var lastAction = map[lc];
        var mdate = Date(date);
        return { id, mname, mdate, lastAction }
    }

    return (
        <>
            <Navbar />
            <CustomizedInputBase findProduct={findProduct} />
            { productData.length != 0 ?
                <>
                    <Grid container className={classes.root}>
                        <Grid item xs={6} >
                            <Paper>
                                <div>
                                    <p>Universal ID : {productData[0][0][0]}</p>
                                    <p>SKU : {productData[0][0][1]}</p>
                                    <p>Owner : {productData[0][0][2]}</p>
                                    <p>Manufacturer : {productData[0][0][3]}</p>
                                    <p>Name of Manufacturer : {productData[0][0][4]}</p>
                                    <p>Details of Manufacturer : {productData[0][0][5]}</p>
                                    <p>Longitude of Manufature : {productData[0][0][6]}</p>
                                    <p>Latitude of Manufature : {productData[0][0][7]}</p>

                                    <p>Manufactured date : {productData[0][1][0]}</p>

                                    
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} >
                             <MapContainer/>
                        </Grid>
                    </Grid>
                    <h2> Product History</h2>
                    <Paper className={classes.root}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productHistory.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={column.id == 'lastAction' ? {color : 'red'} : {}}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </> :
                <>
                    {Text ? <p>Product Not Found</p> : <p>Search a Product</p>}
                </>
            }
        </>
    )
}
