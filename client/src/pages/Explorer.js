import React from "react";
import Paper from '@material-ui/core/Paper';
import Navbar from "../components/Navbar"
import CustomizedInputBase from "../components/Search";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import ProductModal from "../components/Modal";
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import { MapContainer } from "../components/map";
import Button from "@material-ui/core/Button";
import { useStyles } from "../components/Styles";

const columns = [
    { id: 'id', label: 'Universal ID', minWidth: 170 },
    { id: 'mname', label: 'Manfacturer', minWidth: 170 },
    { id: 'mdate', label: 'Date', minWidth: 170 },
    { id: 'pname', label: 'Product Name', minWidth: 170 },
    { id: 'price', label: 'Price', minWidth: 170 },
    { id: 'category', label: 'Category', minWidth: 170 },
    { id: 'lastAction', label: 'Last Action', minWidth: 170 }
];

const map = ["Manufactured", "Bought By Third Party", "Shipped From Manufacturer", "Received By Third Party", "Bought By Customer", "Shipped By Third Party", "Received at DeliveHub", "Shipped From DeliveryHub", "Received By Customer"];

export default function Explorer(props) {
    const classes = useStyles();
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;
    const [search, setSearch] = React.useState("");
    const [productData, setProductData] = React.useState([]);
    const [productHistory, setProductHistory] = React.useState([]);
    const [Text, setText] = React.useState(false);
    const navItem = []
    const [modalData, setModalData] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const findProduct = async (search) => {
        var arr = [];
        var temp = [];
    
            var a = await supplyChainContract.methods.fetchProductPart1(parseInt(search), 'product', 0).call();
            var b = await supplyChainContract.methods.fetchProductPart2(parseInt(search), 'product', 0).call();
            var c = await supplyChainContract.methods.fetchProductPart3(parseInt(search), 'product', 0).call();
            temp.push(a); temp.push(b); temp.push(c);
            setProductData(temp);
            console.log(productData);
            arr = [];
            var l = await supplyChainContract.methods.fetchProductHistoryLength(parseInt(search)).call();
            console.log(l);

            arr = [];
            for (var i = 0; i < l; i++) {
                var h = await supplyChainContract.methods.fetchProductPart1(parseInt(search), 'history', i).call();
                var k = await supplyChainContract.methods.fetchProductPart2(parseInt(search), 'history', i).call();
                var j = await supplyChainContract.methods.fetchProductPart3(parseInt(search), 'history', i).call();
                temp = [];
                temp.push(h); temp.push(k); temp.push(j);
                arr.push(temp);
                console.log(arr);
            }
            setProductHistory(arr);

   

    };
    const createData = (id, mname, date, lc) => {
        var lastAction = map[lc];
        var mdate =date;
        return { id, mname, mdate, lastAction }
    }

    const handleClose = () => setOpen(false);

    const handleClick = async (prod) => {
      await setModalData(prod);
      console.log(modalData);
      setOpen(true);
    };

    return (
        <>
            <Navbar navItems={navItem}>
            <ProductModal prod={modalData} open={open} handleClose={handleClose}/>
            <h1 className={classes.pageHeading}>Search a product</h1>
            <CustomizedInputBase findProduct={findProduct} />
            { productData.length != 0 ?
                <>
                    <Grid container className={classes.Explorerroot}>
                        <Grid item xs={6} >
                            <Paper className={classes.ProductPaper}>
                                <div>
                                    <div className={classes.ExplorerdRow}>Universal ID : {productData[0][0]}</div>
                                    <div className={classes.ExplorerdRow}>SKU : {productData[0][1]}</div>
                                    <div className={classes.ExplorerdRow}>Owner : {productData[0][2]}</div>
                                    <div className={classes.ExplorerdRow}>Manufacturer : {productData[0][3]}</div>
                                    <div className={classes.ExplorerdRow}>Name of Manufacturer : {productData[0][4]}</div>
                                    <div className={classes.ExplorerdRow}>Details of Manufacturer : {productData[0][5]}</div>
                                    <div className={classes.ExplorerdRow}>Longitude of Manufature : {productData[0][6]}</div>
                                    <div className={classes.ExplorerdRow}>Latitude of Manufature : {productData[0][7]}</div>
                                    <div className={classes.ExplorerdRow}>Manufactured date : {productData[1][0]}</div>
                                    
                                    <Button
                             type="submit"
                             variant="contained"
                             color="primary"
                             onClick={() => handleClick(productData)}
                             style={{margin:"10px auto"}}
                           >
                           MORE DETAILS
                           </Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} >
                             {/* <MapContainer/> */}
                        </Grid>
                    </Grid>
                    <br/>
                    <h2 className={classes.tableCount}> Product History</h2>
                    <Paper className={classes.TableRoot2}>
                        <TableContainer className={classes.TableContainer} >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="center"
                                                className={classes.TableHead}
                                                // style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productHistory.length !== 0 ?  (productHistory.map((row) => {
                                        console.log(row)
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row[0][0]}>
                                                        <TableCell className={classes.TableCell} align="center" onClick={() => handleClick(row)}>
                                                            {row[0][0]}
                                                        </TableCell>
                                                        <TableCell className={classes.TableCell} align="center" onClick={() => handleClick(row)}>
                                                            {row[0][4]}
                                                        </TableCell>
                                                        <TableCell className={classes.TableCell} align="center" onClick={() => handleClick(row)}>
                                                            {row[0][5]}
                                                        </TableCell>
                                                        <TableCell className={classes.TableCell} align="center" onClick={() => handleClick(row)}>
                                                            {row[1][1]}
                                                        </TableCell>
                                                        <TableCell className={classes.TableCell} align="center" onClick={() => handleClick(row)}>
                                                            {row[1][3]}
                                                        </TableCell>
                                                        <TableCell className={classes.TableCell} align="center" onClick={() => handleClick(row)}>
                                                            {row[1][4]}
                                                        </TableCell>
                                                        
                                                        <TableCell style={{color:"#f00 !important"}} className={classes.TableCell} align="center" onClick={() => handleClick(row)} >
                                                            {map[row[1][5]]}
                                                        </TableCell>
                                                
                                            </TableRow>
                                        );
                                    })) : <></>  }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </> :
                <>
                    {Text ? <p>Product Not Found</p> : <></>}
                </>
            }
            </Navbar>
        </>
    )
}
