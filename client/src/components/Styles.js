import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    pageWrap:{
        textAlign:"center",
        color:"#1a237e"
    },
    pageHeading:{
        textAlign:"center",
        margin:"10px auto",
        padding:0,
        color:"#1a237e"
    },


    TableRoot: {
      width: '100%',
      maxWidth: 900,
      margin:"5px auto",
      border:"2px solid #1a237e",
      borderRadius:10,
      boxShadow:"2px 2px 10px #9fa8da"
    },
    TableContainer: {
      maxHeight: 500,
      borderRadius:7
    },
    AddressCell :{
        maxWidth: 150,overflow:"hidden", textOverflow: "ellipsis"
    },
    tableCount:{
        textAlign:"center",
        margin:"10px auto",
        padding:0,
        color:"#1a237e"
    },
    TableHead:{
        backgroundColor:"#1a237e",
        color:"#fff"
    },
    TableCell: {
        color:"#1a237e"
    }
  });