import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  dRow: {
    width: "100%",
    borderBottom: `1px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    maxWidth: "550px",
    margin: "0 auto",
  },

  dCol: {
    width: "50%",
    textAlign: "left",
    fontWeight: 600,
    color: "#1a237e",
  },
}));

export default function ProductModal({
  prod,
  open,
  handleClose,
  handleReceiveButton,
}) {
  const [rdata, setRdata] = React.useState({
    long: "",
    lat: "",
  });

  const handleChangeForm = async (e) => {
    setRdata({
      ...rdata,
      [e.target.name]: e.target.value,
    });
  };

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
            {prod.length === 0 ? (
              <></>
            ) : (
              <div style={{ maxHeight: "450px", overflow: "scroll" }}>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Universal ID : </div>
                  <div className={classes.dCol}>{prod[0][0]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>SKU :</div>{" "}
                  <div className={classes.dCol}> {prod[0][1]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Owner : </div>{" "}
                  <div className={classes.dCol}>{prod[0][2]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Manufacturer :</div>{" "}
                  <div className={classes.dCol}>{prod[0][3]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Name of Manufacturer :</div>{" "}
                  <div className={classes.dCol}> {prod[0][4]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Manufactured date :</div>{" "}
                  <div className={classes.dCol}> {prod[1][0]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Details of Manufacturer :</div>{" "}
                  <div className={classes.dCol}> {prod[0][5]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Longitude of Manufature : </div>{" "}
                  <div className={classes.dCol}>{prod[0][6]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Latitude of Manufature :</div>{" "}
                  <div className={classes.dCol}>{prod[0][7]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Product Name : </div>{" "}
                  <div className={classes.dCol}>{prod[1][1]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Product Code:</div>{" "}
                  <div className={classes.dCol}>{prod[1][2]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Product Price: </div>{" "}
                  <div className={classes.dCol}>{prod[1][3]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}> Product Category: </div>
                  <div className={classes.dCol}>{prod[1][4]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Product State: </div>{" "}
                  <div className={classes.dCol}>{prod[1][5]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Third Party Address: </div>{" "}
                  <div className={classes.dCol}>{prod[1][6]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>
                    Third Party Longitude: </div> <div className={classes.dCol}>{prod[1][7]}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>
                    Third Party Latitude: </div> <div className={classes.dCol}>{prod[2][0]}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol}>Delivery Hub Address:</div>{" "}
                  <div className={classes.dCol}> {prod[2][1]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Delivery Hub Longitude: </div>{" "}
                  <div className={classes.dCol}>{prod[2][2]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Delivery Hub Latitude:</div>{" "}
                  <div className={classes.dCol}> {prod[2][3]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol}>Customer Address: </div>{" "}
                  <div className={classes.dCol}>{prod[2][4]}</div>
                </div>

                {prod[1][5] == "2" || prod[1][5] == "5" ? (
                  <>
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
                  </>
                ) : (
                  <> </>
                )}
                {prod[1][5] === "2" ||
                prod[1][5] === "5" ||
                prod[1][5] === "7" ? (
                  <>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleReceiveButton(prod[0][0], rdata.long, rdata.lat)
                      }
                    >
                      Recieve
                    </Button>
                  </>
                ) : (
                  <> </>
                )}
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
