import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 10px',
    display: 'flex',
    margin:'20px auto',
    width: '40%',
    border:"2px solid #1a237e",
    borderRadius:50,
    boxShadow:"2px 2px 10px #9fa8da"

  },
  input: {
    justifyContent:'center',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const [search , setSearch] = React.useState("");
  const onTextChage = async (e) =>{
    setSearch(e.target.value);
  }
  return (
    <>
    <Paper  className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Product Universal ID"
        inputProps={{ 'aria-label': 'Enter Product Universal ID' }}
        onChange = {onTextChage}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={ () => props.findProduct(search)}>
        <SearchIcon />
      </IconButton>
    </Paper>
    </>
  );
}