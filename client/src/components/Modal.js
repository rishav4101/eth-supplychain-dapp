import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProductModal({prod, open, handleClose, handleReceiveButton}) {
    const [rdata, setRdata] = React.useState({
        long : "",
        lat: ""
    })

    const handleChangeForm = async (e) => {
        setRdata({
            ...rdata,
            [e.target.name] : e.target.value
        })
    }

  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
        {prod.length === 0 ? <></> : (<div>
                <p>Universal ID : {prod[0][0]}</p>
                <p>SKU : {prod[0][1]}</p>
                <p>Owner : {prod[0][2]}</p>
                <p>Manufacturer : {prod[0][3]}</p>
                <p>Name of Manufacturer : {prod[0][4]}</p>
                <p>Details of Manufacturer : {prod[0][5]}</p>
                <p>Longitude of Manufature : {prod[0][6]}</p>
                <p>Latitude of Manufature : {prod[0][7]}</p>

                <p>Manufactured date : {prod[1][0]}</p>

                <TextField
        name="long"
        variant="outlined"
        value={rdata.long}
        onChange={handleChangeForm}
        label="long"
        />
        <TextField
        name="lat"
        variant="outlined"
        value={rdata.lat}
        onChange={handleChangeForm}
        label="lat"
        />

                <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => handleReceiveButton(prod[0][0], rdata.long, rdata.lat)}
        >
            Recieve
        </Button>
        </div>)}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
