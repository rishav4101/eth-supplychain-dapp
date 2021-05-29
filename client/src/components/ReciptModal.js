import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useStyles } from "./Styles";

export default function ReciptModal({ recipt, openRecipt, handleCloseRecipt }) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openRecipt}
      onClose={handleCloseRecipt}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openRecipt}>
        <div className={classes.Reciptpaper}>
          <h1 className={classes.pageHeading}>Recipt</h1>
          <div>
            {recipt !== null ? (
              <>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Tx hash: </div>
                  <div className={classes.dCol2}>{recipt.hash}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Block hash: </div>
                  <div className={classes.dCol2}>{recipt.blockHash}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Block Number: </div>
                  <div className={classes.dCol2}>{recipt.blockNumber}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>From: </div>
                  <div className={classes.dCol2}>{recipt.from}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>To: </div>
                  <div className={classes.dCol2}>{recipt.to}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Nonce: </div>
                  <div className={classes.dCol2}>{recipt.nonce}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Input: </div>
                  <div className={classes.dCol2}>{recipt.input}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Gas: </div>
                  <div className={classes.dCol2}>{recipt.gas}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Value: </div>
                  <div className={classes.dCol2}>{recipt.value}</div>
                </div>
              </>
            ) : (
              <> </>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
