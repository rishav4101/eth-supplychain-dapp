// import logo from './logo.svg';
// import './App.css';
import ResponsiveDrawer from './Navbar'
// import CustomizedInputBase from './Search'
// import MapContainer from './map'
// import FormPropsTextFields from './login'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// import BasicTable from './table'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '60%',
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
        <ResponsiveDrawer/>
        <h1 style={{marginLeft: "45%"}}>Add Roles</h1>
        {/* <CustomizedInputBase/> */}
{/* 
      <div className="flex-container">
        <div className="Flex-Left">  
      <h3>Item Name:</h3>
      <h3>Transaction ID:</h3>
      <h3>Item Details:</h3>
        </div>
    <div className="Flex-Right">  <MapContainer/></div>
      </div>
    
    
      <FormPropsTextFields/>
      <BasicTable/> */}
  <form className={classes.root} noValidate autoComplete="off">
    <div style={{marginLeft: "25%", marginTop: "60px"}}>
    <TextField id="outlined-basic" label="Enter Manufacturer Address" variant="outlined" />
    <Button variant="contained" color="primary" style={{marginLeft: "30px", marginTop: "14px", fontSize: "01.275rem"}}>
Submit
</Button>
    </div>

  </form>

  <form className={classes.root} noValidate autoComplete="off">
    <div style={{marginLeft: "25%", marginTop: "40px"}}>
    <TextField id="outlined-basic" label="Enter Delivery Hub Address " variant="outlined" />
    <Button variant="contained" color="primary" style={{marginLeft: "30px", marginTop: "14px", fontSize: "01.275rem"}}>
Submit
</Button>
    </div>

  </form>

  <form className={classes.root} noValidate autoComplete="off">
    <div style={{marginLeft: "25%", marginTop: "40px"}}>
    <TextField id="outlined-basic" label="Enter Customer Address" variant="outlined" />
    <Button variant="contained" color="primary" style={{marginLeft: "30px", marginTop: "14px", fontSize: "01.275rem"}}>
Submit
</Button>
    </div>

  </form>

  <form className={classes.root} noValidate autoComplete="off">
    <div style={{marginLeft: "25%", marginTop: "40px"}}>
    <TextField id="outlined-basic" label=" Enter Third Party Address" variant="outlined" />
    <Button variant="contained" color="primary" style={{marginLeft: "30px", marginTop: "14px", fontSize: "01.275rem"}}>
Submit
</Button>
    </div>

  </form>
    </div>
  );
}

export default App;
