import React from "react";
import Navbar from "../components/Navbar"
import CustomizedInputBase from "../components/Search";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'manufacturer', label: 'Manfacturer', minWidth: 170 },
    { id: 'date', label: 'Manufacturing Date', minWidth: 170 },
    { id: 'action', label: 'Last Action', minWidth: 170 },
]
export default function Explorer(props){
   const accounts = props.accounts;
   const supplyChainContract = props.supplyChainContract;
   const [search , setSearch] = React.useState("");
   const [productData,setProductData] = React.useState([]);
   const [productHistory,setProductHistory] = React.useState([]);
   const [Text,setText] = React.useState(false);
   const findProduct = async (search) => {
    var arr = [];
    var temp = [];
    try{
        var a = await supplyChainContract.methods.fetchProductPart1(parseInt(search), 'product', 0).call();
        var b = await supplyChainContract.methods.fetchProductPart2(parseInt(search), 'product', 0).call();
        var c = await supplyChainContract.methods.fetchProductPart3(parseInt(search), 'product', 0).call();
        temp.push(a); temp.push(b); temp.push(c);
        arr.push(temp);
        setProductData(arr);
        arr = [];
        var l =  await supplyChainContract.methods.fetchProductHistoryLength(parseInt(search)).call();
        console.log(l);
        
        for(var i=0;i<l;i++){
            var h = await supplyChainContract.methods.fetchProductPart2(parseInt(search), 'history', i).call();
            arr.push(h);
        }
        setProductHistory(arr);
    }catch(e){
        setText(true);
        console.log(e);
    }
   
   };


   return (
       <>
       <Navbar/>
       <CustomizedInputBase findProduct={findProduct}/>
        { productData.length != 0 ?
        <>
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
         <div>
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
          </Table>
          </TableContainer>
         </div>
        </>:
        <>
        {Text? <p>Product Not Found</p>:<p>Search a Product</p>}
        </>
        }
       </>
   )
}
